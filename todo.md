```markdown
### Core
[x] **1. Create Base HTML Structure**  
- Validation: Search input and results container present in HTML ✓ 
- Validation: Viewport meta tag configured ✓
- Validation: CSS grid structure renders correctly ✓

[x] **2. Implement Debounced Search Input**  
- Validation: Input triggers search after 300ms delay  
- Validation: Debounce utility prevents rapid calls  
- Validation: Search query stored in state  

[ ] **3. Channel Selection State Management**  
- Validation: Selected channel persists in state  
- Validation: Loading spinner appears during API calls  
- Validation: Previous results clear on new selection  

[ ] **4. Client-Side Caching System**  
- Validation: API responses cached for 5 minutes  
- Validation: Cache serves repeated requests instantly  
- Validation: LRU eviction works beyond 10 items  

[ ] **5. Error Handling Implementation**  
- Validation: Error toasts display API failures  
- Validation: 429 errors trigger retry backoff  
- Validation: Inputs reject invalid characters  

### API
[ ] **1. Channel Search API Integration**  
- Validation: API returns channels for valid queries  
- Validation: Special characters sanitized in requests  
- Validation: Results update UI state correctly  

[ ] **2. Cast Search API Implementation**  
- Validation: Casts load when channel selected  
- Validation: Results sorted by timestamp (newest first)  
- Validation: Empty state shows "No casts found"  

### UI
[ ] **1. Render Channel Results List**  
- Validation: Channels display name/followers  
- Validation: Hover states highlight items  
- Validation: Clicking channel triggers cast load  

[ ] **2. Cast List Rendering**  
- Validation: Cast text truncated at 140 chars  
- Validation: Timestamps show relative time (e.g. "2h ago")  
- Validation: Back button returns to channel list  

[ ] **3. Final Accessibility Pass**  
- Validation: Screen reader announces dynamic updates  
- Validation: All text has 4.5:1 contrast ratio  
- Validation: Full navigation via keyboard/Tab  
```
