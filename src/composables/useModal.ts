import { ref } from 'vue'

type ModalKeys = 'currency' | 'help'

const modals = new Map<ModalKeys, ReturnType<typeof ref<boolean>>>()

export function useModal(key: ModalKeys) {
    if (!modals.has(key)) {
        modals.set(key, ref(false))
    }

    const state = modals.get(key)!

    const openModal = () => {
        console.log('Opening modal:', key)
        state.value = true
    }
    const closeModal = () => {
        state.value = false
    }
    const toggleModal = () => {
        state.value = !state.value
    }

    return {
        isOpen: state,
        openModal,
        closeModal,
        toggleModal,
    }
}
