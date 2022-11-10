import { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import { ICoreClientApi } from 'core'

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99]
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
}

const ProfileIcon = ({ api }: { api: ICoreClientApi }) => {
    function stringToColor(string: string) {
        let hash = 0
        let i

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = '#'

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        /* eslint-enable no-bitwise */

        return color
    }

    function stringAvatar(name: string) {
        const lName = name ? name : 'A A'

        return {
            sx: {
                bgcolor: stringToColor(lName),
            },
            children: `${lName.split(' ')[0][0]}${lName.split(' ')[1][0]}`,
        }
    }

    const [fullName, setfullName] = useState('')

    useEffect(() => {
        api.users.getCurrent().then((data) => {
            data.mapRight((user) => {
                setfullName(user.firstName + ' ' + user.lastName)
            })
        })
    }, [])
    // TODO - аватар в углу должен меняться после смены профиля

    return <Avatar {...stringAvatar(fullName)} />
}

export default ProfileIcon
