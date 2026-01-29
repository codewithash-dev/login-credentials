import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Pressable } from 'react-native';
import { Credential } from '../types';
import { credentialsService } from '../lib/credentialsService';

interface Props {
  credential: Credential;
  onDelete: () => void;
}

export function CredentialCard({ credential, onDelete }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Delete Credential',
      `Are you sure you want to delete "${credential.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await credentialsService.deleteCredential(credential.id);
              onDelete();
            } catch (error) {
              Alert.alert('Error', error instanceof Error ? error.message : 'Failed to delete credential');
            }
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      social: '📱',
      banking: '🏦',
      email: '📧',
      work: '💼',
      other: '🔑',
    };
    return icons[category] || '🔑';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      social: '#3b82f6',
      banking: '#10b981',
      email: '#f59e0b',
      work: '#8b5cf6',
      other: '#6b7280',
    };
    return colors[category] || colors.other;
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleValue }] }]}>
      <Pressable
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={[styles.iconBg, { backgroundColor: getCategoryColor(credential.category) }]}>
              <Text style={styles.categoryIcon}>{getCategoryIcon(credential.category)}</Text>
            </View>
            <View style={styles.titleContent}>
              <Text style={styles.title} numberOfLines={1}>{credential.title}</Text>
              <Text style={styles.badge}>{credential.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.contentSection}>
          <View style={styles.row}>
            <Text style={styles.label}>👤 Username</Text>
            <Text style={styles.value} numberOfLines={1}>{credential.username}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🔒 Password</Text>
            <Text style={styles.passwordValue}>
              {showPassword ? credential.password : '••••••••'}
            </Text>
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.toggleBtn}
            >
              <Text style={styles.toggleIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          {credential.url && (
            <View style={styles.row}>
              <Text style={styles.label}>🔗 URL</Text>
              <Text style={styles.value} numberOfLines={1}>{credential.url}</Text>
            </View>
          )}

          {credential.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.label}>📝 Notes</Text>
              <Text style={styles.notes}>{credential.notes}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.deleteBtn} 
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 28,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  contentSection: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    width: 100,
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
    fontFamily: 'Courier',
  },
  passwordValue: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
    fontFamily: 'Courier',
    fontWeight: '600',
    letterSpacing: 2,
  },
  toggleBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  toggleIcon: {
    fontSize: 18,
  },
  notesContainer: {
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#faf9f7',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  notes: {
    fontSize: 13,
    color: '#374151',
    marginTop: 6,
    lineHeight: 18,
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 4,
  },
  deleteIcon: {
    fontSize: 16,
  },
  deleteBtnText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 15,
  },
});
