'use client'

import { Template, ImageCard, Button, InputText, useNotification } from "@/components"
import { useState } from 'react'
import { useImageService } from '@/resources/image/image.service'
import { Image } from '@/resources/image/image.resource'
import Link from 'next/link'

export default function GaleriaPage() {

    const useService = useImageService();
    const notification = useNotification();
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    const [loading,  setLoading] = useState<boolean>(false)

    async function searchImages(){
        setLoading(true)
        const result = await useService.buscar(query , extension);
        setImages(result);
        setLoading(false)

        if(!result.length){
            notification.notify('No results found', 'warning');
        }
    }

    function renderImageCard(image: Image){
        return(
            <ImageCard key={image.url} nome ={image.name} src={image.url} tamanho={image.size}  extension={image.extension} dataUpload={image.uploadDate} />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <InputText placeholder='Type name or tags' onChange={event => setQuery(event.target.value)}/>
                    <select onChange={event => setExtension(event.target.value)}
                            className="border px-4 py-2 rounded-lg text-gray-900">
                        <option value="">All formats</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                        
                    </select>
                    <Button style='bg-blue-500 hover:bg-blue-300' label='Search' onClick={searchImages}/>
                    <Link href="/formulario">
                        <Button style='bg-yellow-500 hover:bg-yellow-300' label='Add new'/>
                    </Link>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8">
                {
                    renderImageCards()
                }
            </section>
        </Template>
    )
}