import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { Form } from '../../components/Form/Form'
import { MessageList } from '../../components/MessageList/MessageList'
import { ChatList } from '../../components/ChatList/ChatList'

import { AUTHOR } from '../../constants'

import { WithClasses } from '../../HOC/WithClasses'

import styles from './ChatsPage.module.css'


export function ChatsPage({ onAddChat, onAddMessage, messages, chats }) {
  const { chatId } = useParams()

  const MessagesListWithClass = WithClasses(MessageList)

  useEffect(() => {
    if (chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHOR.user
    ) {
      const timeout = setTimeout(() => {
        onAddMessage(chatId, {
          author: AUTHOR.bot,
          text: 'Im BOT'
        })
      }, 1500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [chatId, messages])

  const handleAddMessage = (message) => {
    if (chatId) {
      onAddMessage(chatId, message)
    }
  }

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />
  }

  return (
    <>
      <h1>Welcome to chat!</h1>
      <ChatList chats={chats} onAddChat={onAddChat} />
      <MessagesListWithClass messages={chatId ? messages[chatId] : []}
        classes={styles.border} />
      <Form addMessage={handleAddMessage} />
    </>
  )
}