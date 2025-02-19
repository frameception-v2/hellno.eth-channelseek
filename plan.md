```markdown
### Step 1: Create Base HTML Structure
```text
1. Establish core page layout with search interface container
2. Required files:
   - index.html (Frame root)
   - styles.css (base layout)
3. Implementation:
   - Add search input & results container in HTML
   - Set up viewport meta and Frame dimensions
   - Create CSS grid structure for main components
```

### Step 2: Implement Debounced Search Input
```text
1. Create controlled input with 300ms debounce
2. Required files:
   - app.js (event handlers)
   - utils.js (debounce utility)
3. Implementation:
   - Add input event listener in app.js
   - Create debounce function in utils.js
   - Store search query in component state
```

### Step 3: Channel Search API Integration
```text
1. Connect UI to Neynar /channel/search endpoint
2. Required files:
   - api.js (API clients)
   - app.js (search handler)
3. Implementation:
   - Create API client with fetch wrapper
   - Add query param sanitization
   - Handle response -> state updates
```

### Step 4: Render Channel Results List
```text
1. Transform API data into clickable UI elements
2. Required files:
   - components/ChannelList.js
   - styles.css (result items)
3. Implementation:
   - Create virtual DOM render function
   - Add hover states and click handlers
   - Implement follower count formatting
```

### Step 5: Channel Selection State Management
```text
1. Store selected channel and show loading state
2. Required files:
   - app.js (state management)
   - components/Loading.js
3. Implementation:
   - Add selectedChannel state variable
   - Create loading spinner component
   - Clear previous results on new selection
```

### Step 6: Cast Search API Implementation
```text
1. Fetch casts when channel is selected
2. Required files:
   - api.js (add cast search)
   - app.js (selection handler)
3. Implementation:
   - Add channel_id parameter validation
   - Implement timestamp_desc sorting
   - Handle empty result state
```

### Step 7: Cast List Rendering
```text
1. Display cast elements with engagement metrics
2. Required files:
   - components/CastList.js
   - styles.css (cast cards)
3. Implementation:
   - Create truncation function for cast text
   - Format timestamps with date-fns
   - Add back button functionality
```

### Step 8: Client-Side Caching System
```text
1. Add memory cache for API responses
2. Required files:
   - cache.js (LRU implementation)
   - api.js (cache integration)
3. Implementation:
   - Create 10-item LRU cache
   - Add cache checks before API calls
   - Set TTL of 5 minutes for entries
```

### Step 9: Error Handling Implementation
```text
1. Add user-facing error states and retries
2. Required files:
   - components/ErrorDisplay.js
   - app.js (error boundaries)
3. Implementation:
   - Create error toast component
   - Implement exponential backoff for 429s
   - Add input validation helpers
```

### Step 10: Final Accessibility Pass
```text
1. Ensure WCAG 2.1 compliance
2. Required files:
   - styles.css (a11y fixes)
   - index.html (ARIA labels)
3. Implementation:
   - Add screen reader announcements
   - Improve color contrast ratios
   - Implement keyboard navigation
```
```