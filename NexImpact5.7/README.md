# NexImpact Platform

NexImpact is an AI-powered global impact marketplace that connects people with real-world problems and enables them to create solutions through AI-driven micro-tasks.

## Features

- **Voice-First Interaction**: Engage with the platform using natural voice commands
- **AI Task Breakdown**: Complex problems are broken down into manageable micro-tasks
- **Impact Wallet**: Track your contributions and earn rewards
- **Blockchain Verification**: All impact is verified and recorded on blockchain
- **Responsive Design**: Works on all devices with light/dark mode support

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/neximpact.git
   cd neximpact
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utilities and data handling
- `/public` - Static assets

## Key Pages

- `/` - Home page with introduction to NexImpact
- `/onboarding` - User onboarding flow
- `/dashboard` - Project discovery dashboard
- `/problems/[id]` - Problem detail page with AI task breakdown
- `/wallet` - Impact wallet and rewards

## Technologies Used

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Web Speech API** - Voice recognition capabilities

## Development

### Adding New Components

Place new components in the appropriate directory under `/src/components`:
- `/ui` - Basic UI components
- `/theme` - Theme-related components
- `/wallet` - Wallet-related components

### Styling

This project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`.

### Voice Recognition

Voice recognition is implemented using the Web Speech API. See `VoiceInput.tsx` for implementation details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.