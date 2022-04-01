import { useToast } from "@chakra-ui/react"

const useAlert = () => {
	const toast = useToast()

	const alert = (status?: "info" | "warning" | "success" | "error", message?: string) => (
		toast(
			{
				status: status,
				duration: 7000,
				isClosable: true,
				description: message,
				position: 'top-right',
			}
		)
	)
	
	return alert
}

export default useAlert