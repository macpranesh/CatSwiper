# Cat Matcher - Swipe Dating App for Cats 🐱

A beautiful, mobile-first web application that helps users discover their cat preferences through an intuitive swipe interface, similar to popular dating apps.

## ✨ Features

- **Swipe Interface**: Smooth swipe gestures (left to dislike, right to like)
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **Visual Feedback**: Real-time like/dislike overlays during swiping
- **Progress Tracking**: Visual progress bar and counter
- **Summary Screen**: View all liked cats with statistics
- **Smooth Animations**: Card transitions, scaling, and rotation effects
- **Button Controls**: Alternative to swiping for accessibility
- **Loading States**: Beautiful loading screen while fetching cats

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd cat-matcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📱 How to Use

1. **Start Swiping**: View cat images and swipe right (👍) to like or left (👎) to dislike
2. **Use Buttons**: Alternatively, use the heart and X buttons below the cards
3. **Track Progress**: Watch the progress bar fill up as you go through cats
4. **View Summary**: After all cats, see your matches and statistics
5. **Restart**: Click "Try Again" to start over with new cats

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **Cataas API** - Cat images source

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── SwipeCard.tsx    # Individual swipeable cat card
│   ├── SummaryScreen.tsx # Results and statistics screen
│   └── LoadingScreen.tsx # Loading state component
├── types/               # TypeScript type definitions
│   └── Cat.ts          # Cat interface
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful pink-to-indigo gradients
- **Card Stack Effect**: Layered cards with depth and shadows
- **Smooth Animations**: 60fps swipe animations with rotation
- **Responsive Design**: Works perfectly on mobile and desktop
- **Accessibility**: Keyboard navigation and screen reader support
- **Visual Feedback**: Color-coded like/dislike indicators

## 🔧 Configuration

### Customizing Cat Count
Edit the `CAT_COUNT` variable in `src/App.tsx`:
```typescript
const CAT_COUNT = 15; // Change this number
```

### API Configuration
The app uses the Cataas API (https://cataas.com/) with these parameters:
- Width: 400px
- Height: 500px
- Unique images per session

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure your repository settings for Pages

## 🐛 Troubleshooting

### Images not loading
- Check your internet connection
- The Cataas API might be temporarily unavailable
- Try refreshing the page

### Swipe not working on mobile
- Ensure you're using a modern mobile browser
- Try using the button controls instead
- Check if JavaScript is enabled

### Build errors
- Make sure you have Node.js 16+ installed
- Delete `node_modules` and run `npm install` again
- Check for any TypeScript errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Cataas](https://cataas.com/) for providing the cat images API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---