Convert raw user description and API context into an implementation-ready specification.
Make sure we provide a functional web app that meets the user requirements.
Be concise and clear in your documentation.
We have an existing Farcaster miniapp (Frame v2) template to work with.
There is no database available for this project.

## API Context
# Search for casts on Farcaster via Neynar API

https://api.neynar.com/v2/farcaster/cast/search
Search for casts based on a query string, with optional AND filters

Searching Casts
You can search for casts using keywords and commands in the search query. The following search commands are supported:

Date Range Commands
before:YYYY-MM-DD - Find casts created before the specified date
after:YYYY-MM-DD - Find casts created after the specified date
For example:

star wars before:2023-01-01 - Find Star Wars-related casts from before 2023
blockchain after:2023-06-01 - Find blockchain-related casts from after June 2023
Query Params
q
string
required
Query string to search for casts. Include 'before:YYYY-MM-DD' or 'after:YYYY-MM-DD' to search for casts before or after a specific date.

author_fid
int32
Fid of the user whose casts you want to search

viewer_fid
int32
Providing this will return search results that respects this user's mutes and blocks and includes viewer_context.

parent_url
string
Parent URL of the casts you want to search

channel_id
string
Channel ID of the casts you want to search

priority_mode
boolean
Defaults to false
When true, only returns search results from power badge users and users that the viewer follows (if viewer_fid is provided).

false
limit
int32
1 to 100
Defaults to 25
Number of results to fetch

25
cursor
string
Pagination cursor

const url = 'https://api.neynar.com/v2/farcaster/cast/search?priority_mode=false&limit=25';
const options = {
method: 'GET',
headers: {accept: 'application/json', 'x-api-key': 'NEYNAR_API_DOCS'}
};

fetch(url, options)
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.error(err));

Response:
{ "result": { "casts": [ { "hash": "string", "parent_hash": "string", "parent_url": "string", "root_parent_url": "string", "parent_author": { "fid": 0 }, "author": { "object": "user", "fid": 3, "username": "string", "display_name": "string", "custody_address": "string", "pfp_url": "string", "profile": { "bio": { "text": "string", "mentioned_profiles": [ "string" ] }, "location": { "latitude": 0, "longitude": 0, "address": { "city": "string", "state": "string", "state_code": "string", "country": "string", "country_code": "string" } } }, "follower_count": 0, "following_count": 0, "verifications": [ "string" ], "verified_addresses": { "eth_addresses": [ "string" ], "sol_addresses": [ "string" ] }, "verified_accounts": [ { "platform": "x", "username": "string" } ], "power_badge": true, "experimental": { "neynar_user_score": 0 }, "viewer_context": { "following": true, "followed_by": true, "blocking": true, "blocked_by": true } }, "text": "string", "timestamp": "2025-02-14T18:58:33.704Z", "embeds": [ { "url": "string", "metadata": { "\_status": "string", "content_type": "string", "content_length": 0, "image": { "height_px": 0, "width_px": 0 }, "video": { "duration_s": 0, "stream": [ { "codec_name": "string", "height_px": 0, "width_px": 0 } ] }, "html": { "favicon": "string", "modifiedTime": "string", "ogArticleAuthor": "string", "ogArticleExpirationTime": "string", "ogArticleModifiedTime": "string", "ogArticlePublishedTime": "string", "ogArticlePublisher": "string", "ogArticleSection": "string", "ogArticleTag": "string", "ogAudio": "string", "ogAudioSecureURL": "string", "ogAudioType": "string", "ogAudioURL": "string", "ogAvailability": "string", "ogDate": "string", "ogDescription": "string", "ogDeterminer": "string", "ogEpisode": "string", "ogImage": [ { "height": "string",

# fetch-bulk-casts

**Endpoint**: `GET /farcaster/casts`

## Description
Fetch multiple casts using their respective hashes.

## Parameters
- `casts` (query): Hashes of the cast to be retrived (Comma separated, no spaces)
- `viewer_fid` (query): adds viewer_context to cast object to show whether viewer has liked or recasted the cast.
- `sort_type` (query): Optional parameter to sort the casts based on different criteria

## Response
```yaml
type: object
required:
- result
properties:
  result:
    type: object
    required:
    - casts
    properties:
      casts:
        type: array
        items:
          allOf:
          - type: object
            required:
            - hash
            - parent_hash
            - parent_url
            - root_parent_url
            - parent_author
            - author
            - text
            - timestamp
            - embeds
            properties:
              hash:
                type: string
              parent_hash:
                type:
                - string
                - 'null'
              parent_url:
                type:
                - string
                - 'null'
              root_parent_url:
                type:
                - string
                - 'null'
              parent_author:
                type: object
                required:
                - fid
                properties:
                  fid:
                    oneOf:
                    - type: 'null'
                    - &id001
                      type: integer
                      format: int32
                      description: The unique identifier of a farcaster user (unsigned
                        integer)
                      examples:
                      - 3
                      - 191
                      - 2
                      - 194
                      - 19960
              author: &id011
                type: object
                required:
                - object
                - fid
                - custody_address
                - username
                - profile
                - follower_count
                - following_count
                - verifications
                - verified_addresses
                - verified_accounts
                - power_badge
                properties:
                  object:
                    type: string
                    enum:
                    - user
                  fid: *id001
                  username:
                    type: string
                  display_name:
                    type: string
                  custody_address: &id002
                    type: string
                    pattern: ^0x[a-fA-F0-9]{40}$
                    description: Ethereum address
                  pfp_url:
                    type: string
                    description: The URL of the user's profile picture
                  profile:
                    type: object
                    required:
                    - bio
                    properties:
                      bio:
                        type: object
                        required:
                        - text
                        - mentioned_profiles
                        properties:
                          text:
                            type: string
                          mentioned_profiles:
                            type: array
                            items:
                              type: string
                            default: []
                      location:
                        description: Coordinates and place names for a location
                        type: object
                        required:
                        - latitude
                        - longitude
                        properties:
                          latitude:
                            type: number
                            format: double
                            minimum: -90
                            maximum: 90
                          longitude:
                            type: number
                            format: double
                            minimum: -180
                            maximum: 180
                          address:
                            type: object
                            required:
                            - city
                            - country
                            properties:
                              city:
                                type: string
                              state:
                                type: string
                              state_code:
                                type: string
                              country:
                                type: string
                              country_code:
                                type: string
                  follower_count:
                    type: integer
                    format: int32
                    description: The number of followers the user has.
                  following_count:
                    type: integer
                    format: int32
                    description: The number of users the user is following.
                  verifications:
                    type: array
                    items: *id002
                  verified_addresses:
                    type: object
                    required:
                    - eth_addresses
                    - sol_addresses
                    properties:
                      eth_addresses:
                        type: array
                        description: List of verified Ethereum addresses of the user
                          sorted by oldest to most recent.
                        items: *id002
                      sol_addresses:
                        type: array
                        description: List of verified Solana addresses of the user
                          sorted by oldest to most recent.
                        items:
                          type: string
                          pattern: ^[1-9A-HJ-NP-Za-km-z]{32,44}$
                          description: Solana address
                  verified_accounts:
                    type: array
                    description: Verified accounts of the user on other platforms,
                      currently only X is supported.

# search-channels

**Endpoint**: `GET /farcaster/channel/search`

## Description
Returns a list of channels based on ID or name

## Parameters
- `q` (query): Channel ID or name for the channel being queried
- `limit` (query): Number of results to fetch
- `cursor` (query): Pagination cursor.

## Response
```yaml
type: object
required:
- channels
- next
properties:
  channels:
    type: array
    items:
      type: object
      required:
      - id
      - url
      - object
      properties:
        id:
          type: string
        url:
          type: string
        name:
          type: string
        description:
          type: string
        object:
          type: string
          enum:
          - channel
        created_at:
          description: Epoch timestamp in seconds.
          type: number
        follower_count:
          description: Number of followers the channel has.
          type: number
        external_link:
          type: object
          description: Channel's external link.
          properties:
            title:
              type: string
            url:
              type: string
        image_url:
          type: string
        parent_url:
          type: string
          format: uri
        lead: &id003
          type: object
          required:
          - object
          - fid
          - custody_address
          - username
          - profile
          - follower_count
          - following_count
          - verifications
          - verified_addresses
          - verified_accounts
          - power_badge
          properties:
            object:
              type: string
              enum:
              - user
            fid: &id002
              type: integer
              format: int32
              description: The unique identifier of a farcaster user (unsigned integer)
              examples:
              - 3
              - 191
              - 2
              - 194
              - 19960
            username:
              type: string
            display_name:
              type: string
            custody_address: &id001
              type: string
              pattern: ^0x[a-fA-F0-9]{40}$
              description: Ethereum address
            pfp_url:
              type: string
              description: The URL of the user's profile picture
            profile:
              type: object
              required:
              - bio
              properties:
                bio:
                  type: object
                  required:
                  - text
                  - mentioned_profiles
                  properties:
                    text:
                      type: string
                    mentioned_profiles:
                      type: array
                      items:
                        type: string
                      default: []
                location:
                  description: Coordinates and place names for a location
                  type: object
                  required:
                  - latitude
                  - longitude
                  properties:
                    latitude:
                      type: number
                      format: double
                      minimum: -90
                      maximum: 90
                    longitude:
                      type: number
                      format: double
                      minimum: -180
                      maximum: 180
                    address:
                      type: object
                      required:
                      - city
                      - country
                      properties:
                        city:
                          type: string
                        state:
                          type: string
                        state_code:
                          type: string
                        country:
                          type: string
                        country_code:
                          type: string
            follower_count:
              type: integer
              format: int32
              description: The number of followers the user has.
            following_count:
              type: integer
              format: int32
              description: The number of users the user is following.
            verifications:
              type: array
              items: *id001
            verified_addresses:
              type: object
              required:
              - eth_addresses
              - sol_addresses
              properties:
                eth_addresses:
                  type: array
                  description: List of verified Ethereum addresses of the user sorted
                    by oldest to most recent.
                  items: *id001
                sol_addresses:
                  type: array
                  description: List of verified Solana addresses of the user sorted
                    by oldest to most recent.
                  items:
                    type: string
                    pattern: ^[1-9A-HJ-NP-Za-km-z]{32,44}$
                    description: Solana address
            verified_accounts:
              type: array
              description: Verified accounts of the user on other platforms, currently
                only X is supported.

## User Requirements
make a channel search frame that has an input field where I can search for Farcaster channels and see the results below the input with nr. of followers and if I click on one I want to see recent casts in it

## Output Format
1. Markdown document with these sections:
   - Functional User Requirements
   - Architecture Diagram
   - Data Flow Specification
   - Error Handling Strategies
2. Technical terms clearly defined
