import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatItem = ({content, role}:{content:string, role: "assistant"|"user"}) => {
    
    const auth = useAuth()

    const  extractCodeFromString = (message: string) => {
        if(message.includes("```")){
            const blocks = message.split("```");
            return blocks;
        }
    }

    
    const isCodeBlock = (str: string) => {

        if (
            str.includes("=") ||
            str.includes(";") ||
            str.includes("[") ||
            str.includes("]") ||
            str.includes("{") ||
            str.includes("}") ||
            str.includes("#") ||
            str.includes("//")
        ) {
            return true;
        }
        return false;
    }
    const messageBlocks = extractCodeFromString(content);
   
    return role==="assistant" ?(
        <Box
            sx={{
                display: "flex",
                p: 2,
                bgcolor: "#004d5612",
                gap: 2,
                borderRadius: 2,
                my: 0.5
            }}
        >
            <Avatar sx={{ ml: "0" }}>
                <img src="openai.png" alt="openai" width={"30px"} />
            </Avatar>
            <Box>
                
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                )}

                {messageBlocks && messageBlocks.length && (
                    messageBlocks.map((block) => 

                        isCodeBlock(block) ? (
                            // Grab the first word of the codeBlock to define the language in use
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) 
                        : 
                        (
                            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                        )

                    )
                )}
                
            </Box>
        </Box>
    
    )
    
    :
    
    (
        <Box
            sx={{
                display: "flex",
                p: 2,
                bgcolor: "#004d56",
                gap: 2,
                borderRadius: 2,
                my: 0.5
            }}
        >
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                {auth?.user?.name[0]}
                {auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                )}

                {messageBlocks && messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) 
                        : 
                        (
                            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                        )
            )}
            </Box>
        </Box>


    )
        
    
}

export default ChatItem;
