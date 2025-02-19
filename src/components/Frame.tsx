"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE } from "~/lib/constants";

interface Channel {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  follower_count?: number;
}

function ChannelResults({ query }: { query: string }) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchChannels() {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/channels/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setChannels(data.channels || []);
      } catch (error) {
        console.error('Search error:', error);
        setError(error instanceof Error ? error.message : 'Failed to search channels');
      } finally {
        setIsLoading(false);
      }
    }

    searchChannels();
  }, [query]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Searching...</p>;
  }

  if (channels.length === 0) {
    return <p className="text-center text-gray-500">No channels found</p>;
  }

  return (
    <>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="p-3 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div className="flex items-center gap-3">
            {channel.image_url && (
              <img
                src={channel.image_url}
                alt={channel.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{channel.name}</h3>
              {channel.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {channel.description}
                </p>
              )}
              {channel.follower_count !== undefined && (
                <p className="text-xs text-gray-400">
                  {channel.follower_count.toLocaleString()} followers
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the Frame Template</CardTitle>
        <CardDescription>
          This is an example card that you can customize or remove
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Place content in a Card here.</Label>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (!context) {
        return;
      }

      setContext(context);
      setAdded(context.client.added);

      // If frame isn't already added, prompt user to add it
      if (!context.client.added) {
        addFrame();
      }

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("frameAddRejected", reason);
      });

      sdk.on("frameRemoved", () => {
        console.log("frameRemoved");
        setAdded(false);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("notificationsEnabled", notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        console.log("notificationsDisabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up a MIPD Store, and request Providers.
      const store = createStore();

      // Subscribe to the MIPD Store.
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
        // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
      });
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-gray-300">
          {PROJECT_TITLE}
        </h1>
        
        <div className="grid gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search channels..."
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\w\s-]/g, ''); // Sanitize input
                setSearchQuery(value);
              }}
              aria-label="Search channels"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-2 text-red-500 bg-red-100 dark:bg-red-900 rounded">
              {error}
            </div>
          )}
          
          {/* Results Container */}
          <div className="min-h-[200px] border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
            <div className="grid gap-2">
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : debouncedQuery ? (
                <ChannelResults query={debouncedQuery} />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Search for channels to begin
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
