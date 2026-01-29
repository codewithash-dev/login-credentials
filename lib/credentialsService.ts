import { supabase } from './supabase';
import { Credential } from '../types';

export const credentialsService = {
  // Fetch all credentials for the current user
  async fetchCredentials(): Promise<Credential[]> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  },

  // Add a new credential
  async addCredential(
    title: string,
    username: string,
    password: string,
    category: string = 'other',
    url?: string,
    notes?: string
  ): Promise<Credential> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('credentials')
      .insert({
        user_id: user.id,
        title,
        username,
        password,
        category,
        url: url || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Delete a credential
  async deleteCredential(id: string): Promise<void> {
    const { error } = await supabase
      .from('credentials')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  },

  // Update a credential
  async updateCredential(
    id: string,
    updates: Partial<Omit<Credential, 'id'>>
  ): Promise<Credential> {
    const { data, error } = await supabase
      .from('credentials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
};
