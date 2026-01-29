import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Animated } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setEmail(user.email || '');
      setFullName(user.user_metadata?.full_name || '');
    }
  };

  const handleSignOut = async () => {
    Alert.alert('👋 Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace('/auth/sign-in');
        },
      },
    ]);
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 My Account</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
          </View>
        </View>

        <Text style={styles.name}>{fullName || 'User'}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.verificationBadge}>
          <Text style={styles.verifiedEmoji}>✅</Text>
          <Text style={styles.verifiedText}>Account verified</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔐</Text>
          <Text style={styles.statValue}>Secure</Text>
          <Text style={styles.statLabel}>End-to-end encrypted</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Settings</Text>

        <TouchableOpacity 
          style={styles.item}
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.itemIcon}>🔒</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>Change Password</Text>
            <Text style={styles.itemSubtext}>Update your password</Text>
          </View>
          <Text style={styles.itemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.item}
          activeOpacity={0.7}
        >
          <Text style={styles.itemIcon}>🔔</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>Security Alerts</Text>
            <Text style={styles.itemSubtext}>Manage notifications</Text>
          </View>
          <Text style={styles.itemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.item}
          activeOpacity={0.7}
        >
          <Text style={styles.itemIcon}>📚</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>Help & Support</Text>
            <Text style={styles.itemSubtext}>Get help and feedback</Text>
          </View>
          <Text style={styles.itemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.item}
          activeOpacity={0.7}
        >
          <Text style={styles.itemIcon}>⚖️</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Text style={styles.itemSubtext}>View our policies</Text>
          </View>
          <Text style={styles.itemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoEmoji}>ℹ️</Text>
        <Text style={styles.infoText}>Your credentials are encrypted and securely stored in Supabase with row-level security enabled.</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={styles.signOutBtn} 
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutIcon}>👋</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
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
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    fontWeight: '500',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  verifiedEmoji: {
    fontSize: 16,
  },
  verifiedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16a34a',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  itemIcon: {
    fontSize: 24,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  itemSubtext: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  itemArrow: {
    fontSize: 20,
    color: '#cbd5e1',
  },
  infoBox: {
    backgroundColor: '#dbeafe',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  infoEmoji: {
    fontSize: 18,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#075985',
    fontWeight: '500',
    lineHeight: 18,
  },
  signOutBtn: {
    backgroundColor: '#fee2e2',
    marginHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  signOutIcon: {
    fontSize: 20,
  },
  signOutText: {
    color: '#dc2626',
    fontSize: 17,
    fontWeight: '800',
  },
  spacer: {
    height: 16,
  },
});
