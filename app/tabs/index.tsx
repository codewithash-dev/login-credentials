import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, Alert, Animated } from 'react-native';
import { CredentialCard } from '../../components/CredentialCard';
import { credentialsService } from '../../lib/credentialsService';
import { Credential } from '../../types';

export default function HomeScreen() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const loadCredentials = async () => {
    try {
      const data = await credentialsService.fetchCredentials();
      setCredentials(data);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to load credentials');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCredentials();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCredentials();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingEmoji}>🔄</Text>
        <Text style={styles.loadingText}>Loading your secrets...</Text>
      </View>
    );
  }

  if (credentials.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyEmoji}>🔐</Text>
        <Text style={styles.emptyText}>No credentials yet</Text>
        <Text style={styles.emptySubtext}>Tap the ➕ tab to add your first credential</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔐 Your Credentials</Text>
        <Text style={styles.headerCount}>{credentials.length} saved</Text>
      </View>
      <FlatList
        data={credentials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CredentialCard credential={item} onDelete={loadCredentials} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
        }
        scrollIndicatorInsets={{ right: 1 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
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
  list: {
    padding: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
