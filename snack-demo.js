import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('signin'); // signin, signup, dashboard
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials data
  const mockCredentials = [
    {
      id: '1',
      title: 'GitHub',
      username: 'ashleyhenderson',
      password: '••••••••••••',
      emoji: '🐙',
    },
    {
      id: '2',
      title: 'Gmail',
      username: 'ashley@email.com',
      password: '••••••••••••',
      emoji: '📧',
    },
    {
      id: '3',
      title: 'Vercel',
      username: 'vercel-user',
      password: '••••••••••••',
      emoji: '⚡',
    },
  ];

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setUserName(email.split('@')[0]);
    setScreen('dashboard');
    setEmail('');
    setPassword('');
  };

  const handleSignUp = () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Account created! Redirecting to sign in...');
    setScreen('signin');
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {screen === 'signin' && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>🔐 Login Vault</Text>
            <Text style={styles.subtitle}>Sign in to access your credentials</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={true}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setScreen('signup')}>
              <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === 'signup' && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>🔐 Create Account</Text>
            <Text style={styles.subtitle}>Join Login Vault today</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setScreen('signin')}>
              <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === 'dashboard' && (
        <View style={styles.dashboardContainer}>
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardTitle}>🔐 Your Credentials</Text>
            <Text style={styles.headerCount}>{mockCredentials.length} saved</Text>
            <Text style={styles.userGreeting}>Welcome, {userName}! 👋</Text>
          </View>

          <FlatList
            data={mockCredentials}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>{item.emoji}</Text>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardUsername}>{item.username}</Text>
                  </View>
                </View>
                <View style={styles.cardPassword}>
                  <Text style={styles.passwordLabel}>Password:</Text>
                  <Text style={styles.passwordValue}>{item.password}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionText}>👁️ Show</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]}>
                    <Text style={styles.deleteText}>🗑️ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => Alert.alert('Demo', 'Add functionality disabled in demo')}
          >
            <Text style={styles.addButtonText}>➕ Add Credential</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => {
              setScreen('signin');
              setUserName('');
            }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingRight: 12,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  // Dashboard styles
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  dashboardHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerCount: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  userGreeting: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardUsername: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  cardPassword: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  passwordLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  passwordValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
