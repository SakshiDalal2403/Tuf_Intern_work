# Interactive Wall Calendar Component

A polished, highly interactive, and responsive React component inspired by physical wall calendars. Built entirely on the frontend with a focus on premium aesthetics, seamless user experience, and modern CSS capabilities.

## 🎨 Architectural & Design Choices

1. **Tech Stack (React 18 + Vite):** Selected for its incredibly fast development server (HMR) and modern JSX transforms. The application logic is divided cleanly into custom hooks ([useCalendar](cci:1://file:///c:/Users/saksh/Desktop/TUF_INTERN/calendar-app/src/hooks/useCalendar.js:2:0-45:1), [useRangeSelector](cci:1://file:///c:/Users/saksh/Desktop/TUF_INTERN/calendar-app/src/hooks/useRangeSelector.js:2:0-41:1), [useNotes](cci:1://file:///c:/Users/saksh/Desktop/TUF_INTERN/calendar-app/src/hooks/useNotes.js:2:0-63:1)) keeping the view layer clean and declarative.
2. **State Management & Persistence:** Handled purely natively via React state and `localStorage`. No backend or heavy state-management libraries (like Redux) were used, keeping the bundle incredibly light and perfectly matching the frontend-only constraint.
3. **Styling Strategy (Vanilla CSS & CSS Modules):** Selected to avoid dependency bloat. I heavily utilized modern CSS variables to dynamically theme the calendar based on the month, alongside advanced properties like `backdrop-filter` for glassmorphism and multi-layered box-shadows for a premium "Apple-like" depth.
4. **"Physical" Aesthetic:** Custom UI/UX elements were implemented to capture the true wall-calendar vibe:
   * **Decorative Spiral Binding:** Constructed purely out of CSS borders and inner shadows to simulate 3D metallic rings.
   * **Page-Flip Animations:** Integrated `framer-motion` for buttery smooth transitions when navigating between months.
   * **Dynamic Hero Images:** The hero image completely dictates the theme of the component layout, swapping dynamically with high-quality landscape photography via `picsum.photos`.
5. **Custom Tooltips:** Instead of relying on slow native browser tooltips, a fast, sleek CSS-only tooltip was created using `data-tooltip` attributes. This ensures when users hover over a highlighted holiday, they are instantly shown the holiday name.

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup Steps
1. **Navigate to the root directory**
   Open your terminal and navigate to the project folder:
   ```bash
   cd calendar-app
