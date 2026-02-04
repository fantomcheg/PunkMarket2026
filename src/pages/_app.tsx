import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import XRayToggle from '@/components/XRayToggle'
import XRayPanel from '@/components/XRayPanel'
import LiveXRayPanel from '@/components/LiveXRayPanel/LiveXRayPanel'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [xrayEnabled, setXrayEnabled] = useState(false)
  const [xrayTarget, setXrayTarget] = useState<string | null>(null)
  const [xrayPosition, setXrayPosition] = useState({ x: 0, y: 0 })
  const [liveInputValue, setLiveInputValue] = useState('')

  // Глобальный обработчик X-Ray для всех страниц
  useEffect(() => {
    if (!xrayEnabled) {
      setXrayTarget(null)
      return
    }

    let hideTimeout: NodeJS.Timeout | null = null
    let currentElement: Element | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Очищаем таймер при любом движении мыши
      if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
      }
      
      // Если курсор на X-Ray панели - не делаем ничего, оставляем панель
      if (target.closest('.xray-panel') || target.closest('[class*="LiveXRay"]')) {
        return
      }
      
      // Ищем элемент с data-xray-id
      const xrayElement = target.closest('[data-xray-id]') as HTMLElement
      
      if (xrayElement) {
        // Нашли элемент - показываем панель
        currentElement = xrayElement
        const xrayId = xrayElement.getAttribute('data-xray-id')
        
        // Для интерактивных элементов (input) получаем текущее значение
        if (xrayId === 'search_input' && xrayElement.tagName === 'INPUT') {
          const inputValue = (xrayElement as HTMLInputElement).value
          setLiveInputValue(inputValue)
        }
        
        // Позиционируем окно прямо под курсором (немного ниже)
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        if (xrayTarget !== xrayId) {
          setXrayTarget(xrayId)
          setXrayPosition({ x: mouseX, y: mouseY + 15 }) // 15px под курсором
        }
      } else if (currentElement) {
        // Проверяем расстояние до предыдущего элемента и панели
        const rect = currentElement.getBoundingClientRect()
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        // Если курсор недалеко от элемента или панели - оставляем
        const distance = Math.sqrt(
          Math.pow(Math.min(Math.abs(mouseX - rect.left), Math.abs(mouseX - rect.right)), 2) +
          Math.pow(Math.min(Math.abs(mouseY - rect.top), Math.abs(mouseY - rect.bottom)), 2)
        )
        
        // Если курсор далеко (более 100px) - запускаем таймер
        if (distance > 100) {
          hideTimeout = setTimeout(() => {
            setXrayTarget(null)
            currentElement = null
            hideTimeout = null
          }, 800) // Увеличена задержка до 800мс
        }
      }
    }

    // Обработчик для отслеживания изменений в input в реальном времени
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.getAttribute('data-xray-id') === 'search_input') {
        setLiveInputValue(target.value)
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('input', handleInput, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('input', handleInput)
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
    }
  }, [xrayEnabled, xrayTarget])

  return (
    <>
      {/* Глобальный переключатель X-Ray - на всех страницах */}
      <XRayToggle 
        isActive={xrayEnabled} 
        onToggle={() => setXrayEnabled(!xrayEnabled)} 
      />

      {/* Страница */}
      <Component {...pageProps} />

      {/* Глобальная X-Ray панель - на всех страницах */}
      {xrayEnabled && xrayTarget === 'search_input' && (
        <LiveXRayPanel 
          targetId={xrayTarget} 
          inputValue={liveInputValue}
          position={xrayPosition} 
        />
      )}
      {xrayEnabled && xrayTarget && xrayTarget !== 'search_input' && (
        <XRayPanel targetId={xrayTarget} position={xrayPosition} />
      )}
    </>
  )
}
