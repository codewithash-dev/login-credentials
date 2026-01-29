import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { credentialsService } from '../lib/credentialsService';

interface Props {
  onSuccess: () => void;
}

export function CredentialForm({ onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<'social' | 'banking' | 'email' | 'work' | 'other'>('other');
  const [loading, setLoading] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const categories = ['social', 'banking', 'email', 'work', 'other'] as const;

  const handleSubmit = async () => {
    if (!title || !username || !password) {
      Alert.alert('⚠️ Required Fields', 'Please fill in Title, Username, and Password');
      return;
    }

    setLoading(true);

    try {
      await credentialsService.addCredential(
        title,
        username,
        password,
        category,
        url || undefined,
        notes || undefined
      );

      setTitle('');
      setUsername('');
      setPassword('');
      setUrl('');
      setNotes('');
      setCategory('other');
      Alert.alert('✅ Success', 'Your credential has been saved securely!');
      onSuccess();
    } catch (error) {
      Alert.alert('❌ Error', error instanceof Error ? error.message : 'Failed to save credential');
    } finally {
      setLoading(false);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      social: '📱',
      banking: '🏦',
      email: '📧',
      work: '💼',
      other: '🔑',
    };
    return icons[cat] || '🔑';
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      social: '#3b82f6',
      banking: '#10b981',
      email: '#f59e0b',
      work: '#8b5cf6',
      other: '#6b7280',
    };
    return colors[cat] || '#6b7280';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔐 New Credential</Text>
        <Text style={styles.headerSubtitle}>Add and secure your credentials</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={[styles.input, title && styles.inputFilled]}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Netflix Account"
          placeholderTextColor="#d1d5db"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Username / Email *</Text>
        <TextInput
          style={[styles.input, username && styles.inputFilled]}
          value={username}
          onChangeText={setUsername}
          placeholder="your email or username"
          placeholderTextColor="#d1d5db"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={[styles.input, password && styles.inputFilled]}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="#d1d5db"
          secureTextEntry
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Website/URL</Text>
        <TextInput
          style={[styles.input, url && styles.inputFilled]}
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          placeholderTextColor="#d1d5db"
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                category === cat && [
                  styles.categoryBtnActive,
                  { backgroundColor: getCategoryColor(cat) }
                ],
              ]}
              onPress={() => setCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{getCategoryIcon(cat)}</Text>
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.textArea, notes && styles.inputFilled]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any additional notes or security questions..."
          placeholderTextColor="#d1d5db"
          multiline
          numberOfLines={4}
        />
      </View>

      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={loading}
          activeOpacity={0.9}
        >
          <Text style={styles.submitBtnIcon}>{loading ? '⏳' : '💾'}</Text>
          <Text style={styles.submitBtnText}>
            {loading ? 'Saving...' : 'Save Credential'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  inputFilled: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
    textAlignVertical: 'top',
    height: 110,
    lineHeight: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 6,
  },
  categoryBtnActive: {
    borderColor: 'transparent',
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnDisabled: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
  },
  submitBtnIcon: {
    fontSize: 20,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  spacer: {
    height: 20,
  },
});
