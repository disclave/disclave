import React from "react";
import {useRouter} from "next/router";
import {MessageService} from "../../server/messages/MessageService";
import {GetServerSideProps} from "next";
import {Message} from "../../server/messages/Message";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = new MessageService()
  const {website} = context.query
  const messages = await service.getMessages(website as string)

  return {
    props: {
      messages
    }
  }
}

interface WebsiteProps {
  messages: Array<Message>
}

const Website: React.FC<WebsiteProps> = ({messages}) => {
  const router = useRouter()
  const {website} = router.query

  return (
    <div>
      <main>
        {website}

        {JSON.stringify(messages)}
      </main>
    </div>
  )
}
export default Website
