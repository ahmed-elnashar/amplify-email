import { Heading, Text } from '@chakra-ui/react'

export const AppHeader = () => {
  return (
    <>
      <Heading
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
      >
       Table
        <Text as={'span'} color={'blue.400'}>
          Reservation
        </Text>
      </Heading>
      <Text color={'gray.500'}>
        Confirm your reservation to any of our branches across all over Egypt & enjoy the highest quality ever!
        <br />
        You will get a confirmation mail with all the details attached as soon as you confirm your reservation.
      </Text>
    </>
  )
}
