import React from "react"
// import { createStandaloneToast, useChakra, UseToastOptions } from "@chakra-ui/react/dist/declarations/src"

// /**
//  * React hook used to create a function that can be used
//  * to show toasts in an application.
//  */
//  export default function useSnackbar(options?: {
// 		title: string
// 		message: React.ReactNode
// 		type: "info" | "warning" | "success" | "error" | undefined
// 	}) {
//   const { theme, setColorMode, toggleColorMode, colorMode } = useChakra()
// 	const _options: UseToastOptions = {
// 		duration: 5000,
// 		isClosable: true,
// 		title: options?.title,
// 		status: options?.type,
// 		description: options?.message,
// 	} 
//   return React.useMemo(() => {
//     return createStandaloneToast({
//       theme,
//       colorMode,
//       setColorMode,
//       toggleColorMode,
//       defaultOptions: options,
//     })
//   }, [theme, setColorMode, toggleColorMode, colorMode, options])
// }