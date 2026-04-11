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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string | null
          category: string | null
          created_at: string
          cta_label: string | null
          cta_link: string | null
          end_date: string | null
          id: string
          is_pinned: boolean
          is_published: boolean
          start_date: string
          title: string
        }
        Insert: {
          body?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          end_date?: string | null
          id?: string
          is_pinned?: boolean
          is_published?: boolean
          start_date?: string
          title: string
        }
        Update: {
          body?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          end_date?: string | null
          id?: string
          is_pinned?: boolean
          is_published?: boolean
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      branches: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          location: string | null
          map_link: string | null
          name: string
          service_times: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          location?: string | null
          map_link?: string | null
          name: string
          service_times?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          location?: string | null
          map_link?: string | null
          name?: string
          service_times?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_image: string | null
          created_at: string
          date: string
          description: string | null
          end_date: string | null
          id: string
          is_featured: boolean
          registration_link: string | null
          status: string
          summary: string | null
          time: string | null
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          banner_image?: string | null
          created_at?: string
          date: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean
          registration_link?: string | null
          status?: string
          summary?: string | null
          time?: string | null
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          banner_image?: string | null
          created_at?: string
          date?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean
          registration_link?: string | null
          status?: string
          summary?: string | null
          time?: string | null
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      giving_methods: {
        Row: {
          created_at: string
          details: Json
          display_order: number
          id: string
          is_active: boolean
          method_name: string
        }
        Insert: {
          created_at?: string
          details?: Json
          display_order?: number
          id?: string
          is_active?: boolean
          method_name: string
        }
        Update: {
          created_at?: string
          details?: Json
          display_order?: number
          id?: string
          is_active?: boolean
          method_name?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          config: Json
          display_order: number
          id: string
          is_visible: boolean
          section_key: string
          title: string
          updated_at: string
        }
        Insert: {
          config?: Json
          display_order?: number
          id?: string
          is_visible?: boolean
          section_key: string
          title: string
          updated_at?: string
        }
        Update: {
          config?: Json
          display_order?: number
          id?: string
          is_visible?: boolean
          section_key?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leadership: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number
          full_name: string
          id: string
          is_active: boolean
          photo_url: string | null
          social_links: Json | null
          title: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name: string
          id?: string
          is_active?: boolean
          photo_url?: string | null
          social_links?: Json | null
          title: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name?: string
          id?: string
          is_active?: boolean
          photo_url?: string | null
          social_links?: Json | null
          title?: string
        }
        Relationships: []
      }
      media_gallery: {
        Row: {
          album: string | null
          category: string | null
          created_at: string
          display_order: number
          id: string
          is_featured: boolean
          thumbnail_url: string | null
          title: string | null
          type: string
          url: string
        }
        Insert: {
          album?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          thumbnail_url?: string | null
          title?: string | null
          type?: string
          url: string
        }
        Update: {
          album?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          thumbnail_url?: string | null
          title?: string | null
          type?: string
          url?: string
        }
        Relationships: []
      }
      ministries: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          short_description: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          short_description?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          short_description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_read: boolean
          name: string
          phone: string | null
          request: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean
          name: string
          phone?: string | null
          request: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean
          name?: string
          phone?: string | null
          request?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          audio_url: string | null
          created_at: string
          date: string
          id: string
          is_featured: boolean
          is_published: boolean
          scripture: string | null
          speaker: string
          summary: string | null
          thumbnail_url: string | null
          title: string
          topic: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          date?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          scripture?: string | null
          speaker: string
          summary?: string | null
          thumbnail_url?: string | null
          title: string
          topic?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          date?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          scripture?: string | null
          speaker?: string
          summary?: string | null
          thumbnail_url?: string | null
          title?: string
          topic?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          day: string
          display_order: number
          id: string
          is_active: boolean
          name: string
          notes: string | null
          online_link: string | null
          time: string
          venue: string | null
        }
        Insert: {
          created_at?: string
          day: string
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          online_link?: string | null
          time: string
          venue?: string | null
        }
        Update: {
          created_at?: string
          day?: string
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          online_link?: string | null
          time?: string
          venue?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_anonymous: boolean
          is_featured: boolean
          is_published: boolean
          person_name: string | null
          testimony: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_anonymous?: boolean
          is_featured?: boolean
          is_published?: boolean
          person_name?: string | null
          testimony: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_anonymous?: boolean
          is_featured?: boolean
          is_published?: boolean
          person_name?: string | null
          testimony?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
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
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
