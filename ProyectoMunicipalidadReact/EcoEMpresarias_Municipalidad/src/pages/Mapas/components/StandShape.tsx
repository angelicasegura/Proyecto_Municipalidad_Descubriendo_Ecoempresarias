import React from "react"
import { Rect, Text, Group, Transformer } from "react-konva"
import Konva from "konva"
import { type StandResponse, STAND_COLOR } from "../../../types/mapaType"

interface Props {
    stand: StandResponse
    isSelected: boolean
    onSelect: (id: number) => void
    onChange: (id: number, attrs: Partial<StandResponse>) => void
    readonly?: boolean
}

export default function StandShape({ stand, isSelected, onSelect, onChange, readonly = false }: Props) {

    const shapeRef = React.useRef<Konva.Rect>(null)
    const trRef = React.useRef<Konva.Transformer>(null)

    // Color basado en estado_id numérico
    const color = STAND_COLOR[stand.estado_id] ?? "#94a3b8"

    React.useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer()?.batchDraw()
        }
    }, [isSelected])

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        onChange(stand.stand_id, {
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
        })
    }

    const handleTransformEnd = () => {
        const node = shapeRef.current
        if (!node) return
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()
        node.scaleX(1)
        node.scaleY(1)
        onChange(stand.stand_id, {
            x: Math.round(node.x()),
            y: Math.round(node.y()),
            ancho: Math.round(Math.max(20, node.width() * scaleX)),
            alto: Math.round(Math.max(20, node.height() * scaleY)),
            rotacion: Math.round(node.rotation()),
        })
    }

    return (
        <>
            <Group>
                <Rect
                    ref={shapeRef}
                    x={stand.x}
                    y={stand.y}
                    width={stand.ancho}
                    height={stand.alto}
                    rotation={stand.rotacion}
                    fill={color}
                    opacity={0.85}
                    cornerRadius={3}
                    stroke={isSelected ? "#1d4ed8" : "rgba(0,0,0,0.25)"}
                    strokeWidth={isSelected ? 2 : 1}
                    shadowColor="rgba(0,0,0,0.3)"
                    shadowBlur={isSelected ? 8 : 3}
                    shadowOffsetY={2}
                    draggable={!readonly}
                    onClick={() => onSelect(stand.stand_id)}
                    onTap={() => onSelect(stand.stand_id)}
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                />
                <Text
                    x={stand.x + 4}
                    y={stand.y + stand.alto / 2 - 7}
                    width={stand.ancho - 8}
                    text={stand.codigo}
                    fontSize={Math.min(12, stand.ancho / 5)}
                    fill="#fff"
                    align="center"
                    fontStyle="bold"
                    listening={false}
                />
            </Group>

            {isSelected && !readonly && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) =>
                        newBox.width < 20 || newBox.height < 20 ? oldBox : newBox
                    }
                    rotateEnabled={true}
                    keepRatio={false}
                />
            )}
        </>
    )
}