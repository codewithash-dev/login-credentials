# 🔐 Login Credentials Vault

A secure, modern credential management application built with React Native, Expo, and Supabase. Store, manage, and organize all your passwords in one encrypted vault.

## ✨ Features

- **🔒 Secure Storage** - End-to-end encrypted credentials with Supabase row-level security
- **📱 Multi-Platform** - Works on iOS, Android, and Web
- **🎨 Beautiful UI** - Modern, polished interface with smooth animations
- **🏷️ Smart Organization** - Categorize credentials (Social, Banking, Email, Work, Other)
- **🔍 Easy Access** - Pull-to-refresh and intuitive credential display
- **👤 User Profiles** - Personalized accounts with secure authentication
- **📝 Notes Support** - Add notes and security questions to credentials
- **⚡ Real-time Sync** - Instant updates across all your devices

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: React Native StyleSheet with custom animations
- **State Management**: React Hooks
- **Deployment**: Vercel (Web) + Expo EAS (Native)

## 📋 Project Structure

```
login-credentials/
├── app/
│   ├── auth/              # Authentication screens
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── tabs/              # Main app screens
│   │   ├── index.tsx      # Credentials list
│   │   ├── add.tsx        # Add new credential
│   │   └── profile.tsx    # User profile
│   └── _layout.tsx        # Navigation setup
├── components/
│   ├── CredentialCard.tsx # Credential display
│   ├── CredentialForm.tsx # Add/edit form
│   └── ThemedText.tsx
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── credentialsService.ts # CRUD operations
├── types/
│   └── index.ts           # TypeScript interfaces
└── assets/                # Images and icons
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd login-credentials
   ```

2. **Install dependencies**

   ```bash
   npm install
   npm install react-native-web --legacy-peer-deps
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   echo "EXPO_PUBLIC_SUPABASE_URL=your_supabase_url" > .env
   echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key" >> .env
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Choose your platform**
   - iOS: Press `i`
   - Android: Press `a`
   - Web: Press `w`

## 📦 Database Schema

```sql
CREATE TABLE credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  category TEXT DEFAULT 'other',
  url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Row-level security policies
CREATE POLICY "Users can view own credentials" ON credentials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credentials" ON credentials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own credentials" ON credentials
  FOR DELETE USING (auth.uid() = user_id);
```

## 🔐 Security Features

- **Authentication**: Supabase Auth with email/password
- **Encryption**: Data encrypted at rest in Supabase
- **Row-Level Security**: Users can only access their own credentials
- **Secure Password Storage**: Passwords handled securely throughout the app
- **Session Management**: Automatic logout on sign out

## 📱 Screenshots

### Sign Up / Sign In

[Screenshot placeholder]

### Credentials List

[Screenshot placeholder]

### Add New Credential

[Screenshot placeholder]

### Profile Page

[Screenshot placeholder]

## 🚀 Deployment

### Web (Vercel)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Access your app**
   - Your app will be live at `https://your-project.vercel.app`

### Native (iOS/Android)

Use Expo EAS CLI for building native apps:

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 🧪 Testing

### Test Credentials

- **Email**: ashleyhenderson908@gmail.com
- **Password**: Password123

### Test Data

Try adding credentials for:

- Netflix (Social)
- Bank Account (Banking)
- Gmail (Email)
- Work Project (Work)

## 📝 API Reference

### Credentials Service

#### `fetchCredentials()`

Get all credentials for the logged-in user.

```typescript
const credentials = await credentialsService.fetchCredentials();
```

#### `addCredential(title, username, password, category, url?, notes?)`

Create a new credential.

```typescript
await credentialsService.addCredential(
  "Netflix",
  "user@example.com",
  "password123",
  "social",
  "https://netflix.com",
  "Shared with family",
);
```

#### `deleteCredential(id)`

Delete a credential by ID.

```typescript
await credentialsService.deleteCredential(credentialId);
```

#### `updateCredential(id, updates)`

Update a credential's details.

```typescript
await credentialsService.updateCredential(credentialId, {
  password: "newpassword123",
});
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Expo](https://expo.dev) - React Native framework
- [React Native](https://reactnative.dev) - Mobile framework
- [Vercel](https://vercel.com) - Hosting platform

## 📞 Contact

For questions or support, reach out at:

- **Portfolio**: [codewithash.com](https://codewithash.com)
- **GitHub**: [@ashleyhenderson](https://github.com/ashleyhenderson)

---

**Made with 💜 by Ashley Henderson**
