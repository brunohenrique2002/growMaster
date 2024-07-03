declare module '@/store/Menu' {
    import { Store } from 'pinia';

    interface MenuStore {
        isActive: boolean;
        showSide(): void;
    }

    export function useMenuStore(): Store<MenuStore>;
}