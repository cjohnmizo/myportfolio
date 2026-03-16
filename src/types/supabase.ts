export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          headline: string;
          current_position: string;
          location: string;
          email: string;
          short_bio: string;
          long_bio: string;
          avatar_url: string;
          resume_url: string | null;
          github_username: string;
          years_experience: number;
          is_available_for_hire: boolean;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          headline: string;
          current_position: string;
          location: string;
          email: string;
          short_bio: string;
          long_bio: string;
          avatar_url: string;
          resume_url?: string | null;
          github_username: string;
          years_experience?: number;
          is_available_for_hire?: boolean;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          description: string;
          challenge: string;
          solution: string;
          impact: string;
          category: string;
          status: string;
          year: string;
          sort_order: number;
          is_featured: boolean;
          is_published: boolean;
          cover_image: string;
          gallery_images: string[];
          demo_url: string | null;
          github_url: string | null;
          case_study_url: string | null;
          metrics: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          description: string;
          challenge: string;
          solution: string;
          impact: string;
          category: string;
          status: string;
          year: string;
          sort_order?: number;
          is_featured?: boolean;
          is_published?: boolean;
          cover_image: string;
          gallery_images?: string[];
          demo_url?: string | null;
          github_url?: string | null;
          case_study_url?: string | null;
          metrics?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      project_tech_stack: {
        Row: {
          id: string;
          project_id: string;
          label: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          label: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_tech_stack"]["Insert"]>;
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number;
          icon: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          proficiency: number;
          icon: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["skills"]["Insert"]>;
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          location: string;
          employment_type: string;
          start_date: string;
          end_date: string | null;
          summary: string;
          achievements: string[];
          tech_stack: string[];
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          location: string;
          employment_type: string;
          start_date: string;
          end_date?: string | null;
          summary: string;
          achievements?: string[];
          tech_stack?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
        Relationships: [];
      };
      education: {
        Row: {
          id: string;
          institution: string;
          degree: string;
          field: string;
          location: string;
          start_date: string;
          end_date: string | null;
          grade: string;
          description: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution: string;
          degree: string;
          field: string;
          location: string;
          start_date: string;
          end_date?: string | null;
          grade: string;
          description: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["education"]["Insert"]>;
        Relationships: [];
      };
      social_links: {
        Row: {
          id: string;
          label: string;
          platform: string;
          url: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          platform: string;
          url: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["social_links"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          hero_eyebrow: string;
          hero_title: string;
          hero_subtitle: string;
          hero_description: string;
          about_title: string;
          about_body: string;
          contact_title: string;
          contact_description: string;
          seo_title: string;
          seo_description: string;
          footer_note: string;
          primary_accent: string;
          secondary_accent: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_eyebrow: string;
          hero_title: string;
          hero_subtitle: string;
          hero_description: string;
          about_title: string;
          about_body: string;
          contact_title: string;
          contact_description: string;
          seo_title: string;
          seo_description: string;
          footer_note: string;
          primary_accent: string;
          secondary_accent: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      media_assets: {
        Row: {
          id: string;
          bucket: string;
          path: string;
          public_url: string;
          alt_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          bucket: string;
          path: string;
          public_url: string;
          alt_text: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["media_assets"]["Insert"]>;
        Relationships: [];
      };
      admin_auth_audit_log: {
        Row: {
          id: string;
          admin_user_id: string | null;
          email: string;
          ip_address: string | null;
          user_agent: string | null;
          event_type: string;
          reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_user_id?: string | null;
          email: string;
          ip_address?: string | null;
          user_agent?: string | null;
          event_type: string;
          reason?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admin_auth_audit_log"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
