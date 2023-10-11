import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import './App.css'
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  MoonIcon,
  RepeatClockIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [inCompleteTodos, setIncompleteTodos] = useState(null)
  const [completeTodos, setCompleteTodos] = useState(null)
  const [input, setInput] = useState('')

  const toast = useToast()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  useEffect(() => {
    const incomplete = JSON.parse(localStorage.getItem('incomplete')) || []
    const complete = JSON.parse(localStorage.getItem('complete')) || []
    if (incomplete) {
      setIncompleteTodos(incomplete)
    }
    if (complete) {
      setCompleteTodos(complete)
    }
  }, [])

  useEffect(() => {
    if (inCompleteTodos === null || completeTodos === null) {
      return
    }
    localStorage.setItem('incomplete', JSON.stringify(inCompleteTodos))
    localStorage.setItem('complete', JSON.stringify(completeTodos))
  }, [inCompleteTodos, completeTodos])

  const addToDo = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        description: 'Please enter a task',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: isDesktopOrLaptop ? 'top-right' : 'bottom',
      })
      return
    }
    setIncompleteTodos((values) => [...values, input])
    setInput('')
  }

  const completeToDo = (index) => {
    const todo = inCompleteTodos[index]
    setCompleteTodos((values) => [todo, ...values])
    setIncompleteTodos((values) => values.filter((val, i) => i !== index))
  }

  const deleteToDo = (index) => {
    setIncompleteTodos((values) => values.filter((val, i) => i !== index))
  }

  const clearToDo = (index) => {
    setCompleteTodos((values) => values.filter((val, i) => i !== index))
  }

  const undoComplete = (index) => {
    const todo = completeTodos[index]
    setIncompleteTodos((values) => [...values, todo])
    setCompleteTodos((values) => values.filter((val, i) => i !== index))
  }

  if (inCompleteTodos === null || completeTodos === null) return null

  return (
    <Box
      bgGradient={
        darkMode
          ? 'linear(to-br, #353535, #000000)'
          : 'linear(to-br, #4af3ff, #2376f1)'
      }
      w={'100vw'}
      h={'100%'}
      minHeight={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
    >
      <Box w={isDesktopOrLaptop ? '800px' : '350px'}>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={'50px'}
          marginBottom={'25px'}
        >
          <Text
            fontFamily={'Inter'}
            fontSize={isDesktopOrLaptop ? '6xl' : '5xl'}
            fontWeight={'bold'}
            color={'white'}
            className={'user-select-none'}
          >
            DAILY DO
          </Text>
          <IconButton
            icon={darkMode ? <MoonIcon /> : <SunIcon />}
            onClick={() => {
              setDarkMode((value) => !value)
            }}
            size={'lg'}
            bg={'white'}
          ></IconButton>
        </HStack>
        <Box
          display={'flex'}
          gap={'10px'}
          flexDirection={isDesktopOrLaptop ? 'row' : 'column'}
        >
          <Input
            className='glass user-select-none'
            fontWeight={'medium'}
            value={input}
            color={darkMode ? 'white' : 'black'}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addToDo()
              }
            }}
          ></Input>
          <IconButton
            paddingLeft={'40px'}
            paddingRight={'40px'}
            icon={<AddIcon />}
            onClick={() => addToDo()}
          ></IconButton>
        </Box>
      </Box>
      {inCompleteTodos.length > 0 && (
        <VStack w={isDesktopOrLaptop ? '800px' : '350px'} gap={'20px'}>
          {inCompleteTodos.map((todo, index) => {
            return (
              <Box
                className='glass user-select-none'
                w={isDesktopOrLaptop ? '800px' : '350px'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={'20px'}
                key={index}
              >
                <Text
                  fontFamily={'Inter'}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  color={'white'}
                >
                  {todo}
                </Text>
                <HStack>
                  <IconButton
                    icon={<DeleteIcon />}
                    key={index}
                    onClick={() => deleteToDo(index)}
                  ></IconButton>
                  <IconButton
                    icon={<CheckIcon />}
                    key={index}
                    onClick={() => completeToDo(index)}
                  ></IconButton>
                </HStack>
              </Box>
            )
          })}
        </VStack>
      )}
      {completeTodos.length > 0 && (
        <VStack w={isDesktopOrLaptop ? '800px' : '350px'} gap={'20px'}>
          {completeTodos.map((todo, index) => {
            return (
              <Box
                className='glass user-select-none'
                w={isDesktopOrLaptop ? '800px' : '350px'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={'20px'}
                key={index}
              >
                <Text
                  fontFamily={'Inter'}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  color={darkMode ? 'lightblue' : 'green'}
                  textDecoration={'line-through'}
                >
                  {todo}
                </Text>
                <HStack>
                  <IconButton
                    icon={<DeleteIcon />}
                    key={index}
                    onClick={() => clearToDo(index)}
                  ></IconButton>
                  <IconButton
                    icon={<RepeatClockIcon />}
                    key={index}
                    onClick={() => undoComplete(index)}
                  ></IconButton>
                </HStack>
              </Box>
            )
          })}
        </VStack>
      )}
      {(inCompleteTodos.length > 0 || completeTodos.length > 0) && (
        <HStack marginBottom={'50px'}>
          {inCompleteTodos.length > 0 && (
            <Button
              onClick={() => {
                setCompleteTodos([])
                setIncompleteTodos([])
              }}
              gap={'20px'}
            >
              <Icon as={DeleteIcon} />
              <Text>Clear All</Text>
            </Button>
          )}
          {completeTodos.length > 0 && (
            <Button onClick={() => setCompleteTodos([])} gap={'20px'}>
              <Icon as={DeleteIcon} />
              <Text>Clear Completed</Text>
            </Button>
          )}
        </HStack>
      )}
    </Box>
  )
}

export default App
