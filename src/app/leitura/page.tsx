"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { days } from "@/lib/dias"
import { useState, useEffect } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "cookies-next"
import { motion, AnimatePresence } from "framer-motion"
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function LeituraPage() {
    const [checkedDays, setCheckedDays] = useState<{ [key: number]: boolean }>({})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<number | null>(null)
    const username = getCookie('user_name')
    const [showSuccess, setShowSuccess] = useState(false)
    const { width, height } = useWindowSize()

    useEffect(() => {
        const fetchReadDays = async () => {
            const userId = getCookie('user_id')
            try {
                const response = await fetch(`/api/readdays/${userId}`)
                const data = await response.json()

                const readDaysMap = data.reduce((acc: { [key: number]: boolean }, reading: any) => {
                    const dayIndex = days.findIndex(d => d.day === reading.day)
                    if (dayIndex !== -1) {
                        acc[dayIndex] = true
                    }
                    return acc
                }, {})

                setCheckedDays(readDaysMap)
            } catch (error) {
                console.error("Erro ao buscar dias lidos:", error)
            }
        }

        fetchReadDays()
    }, [])

    // Simulando dados do usuário
    const handleCheckDay = (index: number) => {
        if (!checkedDays[index]) {
            setSelectedDay(index)
            setDialogOpen(true)
        } else {
            setCheckedDays(prev => ({
                ...prev,
                [index]: false
            }))
        }
    }

    const handleConfirmReading = async () => {
        const username = getCookie('user_name')
        const userId = getCookie('user_id')

        if (selectedDay !== null) {
            try {
                const response = await fetch('/api/readdays', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        day: days[selectedDay].day,
                        reading: days[selectedDay].read,
                        userName: username,
                        userId: userId,
                        timestamp: new Date().toISOString()
                    })
                })

                if (response.ok) {
                    setCheckedDays(prev => ({
                        ...prev,
                        [selectedDay]: true
                    }))
                    setDialogOpen(false)
                    setShowSuccess(true)
                    setTimeout(() => setShowSuccess(false), 3000)
                } else {
                    console.error("Erro ao salvar leitura")
                }
            } catch (error) {
                console.error("Erro ao salvar leitura:", error)
            }
        }
    }

    return (
        <div className="p-8">
            <div className="flex flex-col gap-4 items-center">
                <img src="/logo.png" alt="Logo" />
                <div className="flex flex-col gap-0 mt-10 items-center">
                    <span className="font-outfit">Bem vindo(a) {username}</span>
                    <span className="font-outfit font-semibold">Marque o dia que você leu</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 lg:items-center">
                {days.map((item, index) => (
                    <label
                        key={index}
                        className={`flex flex-wrap items-center gap-2 cursor-pointer
                            ${checkedDays[index] ? 'line-through bg-yellow-100 rounded' : ''}
                            `}
                    >
                        <Checkbox
                            checked={checkedDays[index] || false}
                            onCheckedChange={() => handleCheckDay(index)}
                        />
                        <span className={`font-outfit lg:text-2xl font-bold text-[#5472b7]
                            ${checkedDays[index] ? 'line-through bg-yellow-100 px-2 rounded' : ''}
                        `}>
                            Dia -
                            {` ${item.day}`}:
                        </span>
                        <span className={`font-outfit lg:text-2xl
                            ${checkedDays[index] ? 'line-through bg-yellow-100 px-2 rounded' : ''}
                        `}>
                            {item.read}
                        </span>
                    </label>
                ))}
            </div>

            <AlertDialog open={showSuccess} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    {showSuccess && (
                        <ReactConfetti
                            width={width}
                            height={height}
                            recycle={false}
                            numberOfPieces={200}
                            gravity={0.3}
                        />
                    )}
                    <AlertDialogHeader>
                        <AlertDialogTitle>Parabens! 🎉</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você completou mais um dia! Continue nessa constância!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={()=> setShowSuccess(false)}>
                            Fechar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Leitura</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você realmente leu o dia {selectedDay !== null ? days[selectedDay].day : ''}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmReading}>
                            Confirmar Leitura
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}