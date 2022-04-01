import { SimpleGrid, Image } from "@chakra-ui/react";

const GridImages = () => {
	
	return (
		<SimpleGrid 
			m={10}
			zIndex={1}
			columns={[1, 2, 3]}
			spacing={10}
		>
			{
				[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
					<Image
						key={i}
						borderRadius={15} 
						src={`/images/image_${i}.jpg`} 
						alt={String(i)} 
					/>
				))
			}
		</SimpleGrid>
	)
}

export default GridImages