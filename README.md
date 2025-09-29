# 🎧 Radio Mini Player

A single-page application (SPA) for browsing and playing radio stations, built with a focus on a clean, scalable, and maintainable architecture.

This project uses React, TypeScript, and Tailwind CSS. The core business logic is intentionally separated from the React UI, allowing it to be potentially extracted into a standalone, framework-agnostic package.

## ✨ Core Features

- **Universal Search**: Instantly filter stations by any field, including name, description, or tags.
- **Custom Audio Player**: Click any station to play its stream, with simple Play/Pause controls.
- **Responsive Design**: A fully responsive layout for a seamless experience on desktop, tablet, and mobile.
- **Skeleton Loading**: Skeleton screens provide immediate feedback while the station list is loading (use tool like [Requestly](https://chromewebstore.google.com/detail/requestly-supercharge-you/mdnleldcmiljblolnjhpnblkcekpdkpa) to simulate delay).
- **Dynamic Tag Display**: Cleanly handles numerous tags by showing the most relevant ones and a "+X more" indicator.
- **Robust Error Handling**: Features a top-level error boundary to prevent application crashes and handles stream loading errors gracefully.

## 📂 Project Structure

The codebase is organized into two main directories to separate concerns:

- `src/core`: Contains framework-agnostic business logic, including the API client, audio player engine, and data models.
- `src/app`: Contains the React-specific implementation, including components, hooks, pages, and context providers.

## 🚀 Getting Started

To run the project locally, follow these steps:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Lint and type-check the code
npm run lint
npm run typecheck
```

## 🌱 Future Improvements

Here are some improvements I would do to enhance the application:

- **Testing**: Implement a comprehensive test suite (unit, integration, and end-to-end) to ensure code quality and reliability + code coverage
- **Performance Optimization**:
  - If large amount of stations expected  - introduce a **virtualized list** for efficient render.
  - Implement **lazy loading for images** with thumbnails (or low+hi res) to reduce initial page load time.
  - Use Critical CSS technique to improve CWW
  - **Pre-load** station data or audio streams to enable faster playback initiation.
- **Code Quality**:
  - Enforce stricter **linting rules** and integrate pre-commit hooks.
  - Implement tools like <https://github.com/sverweij/dependency-cruiser> or/and NX to get hint on dependencies between codebase
  - Continue **refactoring** to further improve code maintainability and component decoupling.
- **UX Enhancements**:
  - Re-evaluate how "Popularity" and "Reliability" are used. Instead of stars, we could visually highlight "Trending" or "Popular" stations. Reliability could be a factor in the default sorting algorithm rather than a displayed metric, but IMO this calculation is best handled **server-side** which is out of scope of this project (SPA requirement)

## 🗺️ Roadmap (API Dependent)

The following features could be implemented in the future iterations of **player** but would require updates to the backing API:

- **Monetization**: Ad placements (e.g., pre-roll audio) and sponsored station listings.
- **Personalization**: Allow users to "pin" or save their favorite stations, continue listen on another device
- **Advanced Playback**: DVR-like features, such as recording or rewinding live streams.
- **Rich Metadata**: Display real-time song and artist information during playback.
- etc.
