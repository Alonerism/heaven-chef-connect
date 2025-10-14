export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chef_listings: {
        Row: {
          add_ons: Json | null
          availability: Json | null
          base_price_cents: number | null
          bio: string | null
          chef_id: string
          city: string | null
          created_at: string | null
          cuisines: string[] | null
          diet_tags: string[] | null
          id: string
          is_active: boolean | null
          lat: number | null
          lng: number | null
          min_hours: number | null
          photos: Json | null
          price_unit: string | null
          rating_avg: number | null
          rating_count: number | null
          state: string | null
          title: string | null
          travel_radius_km: number | null
        }
        Insert: {
          add_ons?: Json | null
          availability?: Json | null
          base_price_cents?: number | null
          bio?: string | null
          chef_id: string
          city?: string | null
          created_at?: string | null
          cuisines?: string[] | null
          diet_tags?: string[] | null
          id?: string
          is_active?: boolean | null
          lat?: number | null
          lng?: number | null
          min_hours?: number | null
          photos?: Json | null
          price_unit?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          state?: string | null
          title?: string | null
          travel_radius_km?: number | null
        }
        Update: {
          add_ons?: Json | null
          availability?: Json | null
          base_price_cents?: number | null
          bio?: string | null
          chef_id?: string
          city?: string | null
          created_at?: string | null
          cuisines?: string[] | null
          diet_tags?: string[] | null
          id?: string
          is_active?: boolean | null
          lat?: number | null
          lng?: number | null
          min_hours?: number | null
          photos?: Json | null
          price_unit?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          state?: string | null
          title?: string | null
          travel_radius_km?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chef_listings_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chef_requests: {
        Row: {
          created_at: string | null
          customer_id: string
          end_time: string | null
          headcount: number | null
          id: string
          listing_id: string
          meals: number | null
          message: string | null
          requested_date: string | null
          start_time: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          end_time?: string | null
          headcount?: number | null
          id?: string
          listing_id: string
          meals?: number | null
          message?: string | null
          requested_date?: string | null
          start_time?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          end_time?: string | null
          headcount?: number | null
          id?: string
          listing_id?: string
          meals?: number | null
          message?: string | null
          requested_date?: string | null
          start_time?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chef_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chef_requests_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "chef_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_bids: {
        Row: {
          attachments: Json | null
          chef_id: string
          created_at: string | null
          id: string
          job_id: string
          message: string | null
          price_cents: number
          price_type: string | null
          proposed_menu: string | null
          status: string | null
        }
        Insert: {
          attachments?: Json | null
          chef_id: string
          created_at?: string | null
          id?: string
          job_id: string
          message?: string | null
          price_cents: number
          price_type?: string | null
          proposed_menu?: string | null
          status?: string | null
        }
        Update: {
          attachments?: Json | null
          chef_id?: string
          created_at?: string | null
          id?: string
          job_id?: string
          message?: string | null
          price_cents?: number
          price_type?: string | null
          proposed_menu?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_bids_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_bids_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          budget_max_cents: number | null
          budget_min_cents: number | null
          budget_type: string | null
          created_at: string | null
          cuisine: string[] | null
          customer_id: string
          diet_tags: string[] | null
          end_time: string | null
          equipment: string | null
          event_date: string | null
          headcount: number | null
          id: string
          ingredients_provided: boolean | null
          lat: number | null
          lng: number | null
          location_address: string | null
          meals: number | null
          metrics: Json | null
          notes: string | null
          photos: Json | null
          start_time: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          budget_max_cents?: number | null
          budget_min_cents?: number | null
          budget_type?: string | null
          created_at?: string | null
          cuisine?: string[] | null
          customer_id: string
          diet_tags?: string[] | null
          end_time?: string | null
          equipment?: string | null
          event_date?: string | null
          headcount?: number | null
          id?: string
          ingredients_provided?: boolean | null
          lat?: number | null
          lng?: number | null
          location_address?: string | null
          meals?: number | null
          metrics?: Json | null
          notes?: string | null
          photos?: Json | null
          start_time?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          budget_max_cents?: number | null
          budget_min_cents?: number | null
          budget_type?: string | null
          created_at?: string | null
          cuisine?: string[] | null
          customer_id?: string
          diet_tags?: string[] | null
          end_time?: string | null
          equipment?: string | null
          event_date?: string | null
          headcount?: number | null
          id?: string
          ingredients_provided?: boolean | null
          lat?: number | null
          lng?: number | null
          location_address?: string | null
          meals?: number | null
          metrics?: Json | null
          notes?: string | null
          photos?: Json | null
          start_time?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
