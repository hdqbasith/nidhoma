declare global {

    export interface ConnectedAccount {
        id: number;
        provider: string;
        provider_id: number;
        created_at: string
    }

    export declare type ProviderId = 'bitbucket' | 'facebook' | 'github' | 'gitlab' | 'google' | 'linkedin' | 'linkedin-openid' | 'slack' | 'twitter' | 'twitter-oauth-2';

    export interface Provider {
        id: ProviderId;
        name: string;
        buttonLabel?: string;
    }

    export interface Socialstream {
        show: string;
        prompt: string;
        hasPassword: string;
        providers: Provider[];
        connectedAccounts: ConnectedAccount[];
    }

    // export interface User {
    //     id: number;
    //     name: string;
    //     email: string;
    //     email_verified_at: string;
    // }

    export interface ConnectedAccount {
        // columns
        id: number
        user_id: string
        provider: string
        provider_id: string
        name: string | null
        nickname: string | null
        email: string | null
        telephone: string | null
        avatar_path: string | null
        token: unknown
        secret: string | null
        refresh_token: string | null
        expires_at: string | null
        created_at: string | null
        updated_at: string | null
        // relations
        user: User
    }
    export interface OldUser {
    }

    export interface Permission {
        // columns
        id: string
        name: string
        guard_name: string
        created_at: string | null
        updated_at: string | null
        // relations
        roles: Role[]
        users: User[]
        permissions: Permission[]
    }

    export interface Role {
        // columns
        id: string
        name: string
        guard_name: string
        created_at: string | null
        updated_at: string | null
        // relations
        permissions: Permission[]
        users: User[]
    }

    export interface classroom {
        id: string | null,
        nama_kelas: string | null,
        nama_kelas2: string | null,
        tahun_ajaran: string | null,
        kode_wali: string | null,
        jurusan: number | null,
        tingkat: string | null,
    }
    export interface DotThree {
        icon?: string | IconifyIcon,
        text: string | null,
        color?: string | null,
        action?: string | null
    }

    export interface User extends Record<string, any> {
        // columns
        id: string
        name: string
        email: string
        email_verified_at: string | null
        password?: string | null
        two_factor_secret?: string | null
        two_factor_recovery_codes?: string | null
        two_factor_confirmed_at: string | null
        remember_token?: string | null
        profile_photo_path: string | null
        // created_at: string | null
        // updated_at: string | null
        // mutators
        profile_photo_url: string
        get_photo_url: string
        // relations
        must_verify_email: string | null
        has_password: string | null
        tokens: PersonalAccessToken[]
        connected_accounts: ConnectedAccount[]
        notifications: DatabaseNotification[]
        roles: string[] | null
        permissions: Permission[]
    }
    export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
        auth: {
            user: User;
        };
        dataPersonal: StudentPersonal;
        dataAyah: StudentFather;
        dataIbu: StudentMother;
        dataWali: StudentGuardian;
        dataDomisili: StudentDomicile;
    };

    import { FunctionalComponent, SVGAttributes } from 'vue';
    interface SVGProps extends Partial<SVGAttributes> {
        size?: 24 | number;
        strokeWidth?: number | string;
        absoluteStrokeWidth?: string;
    }
    export type Icon = FunctionalComponent<SVGProps>;
}
export { }
