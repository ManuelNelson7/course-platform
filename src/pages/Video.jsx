import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, getFirestore, getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import { LinkIcon } from '@heroicons/react/outline'

import Navbar from '../components/Navbar'

const Video = () => {
    const { curso, video } = useParams()
    const [course, setCourse] = useState({})
    const [videos, setVideos] = useState([])
    const [lesson, setLesson] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const db = getFirestore()
        const courseRef = doc(db, 'cursos', curso)
        const lessonRef = doc(db, 'videos', video)

        getDoc(courseRef)
            .then(res => {
                setCourse({ id: res.id, ...res.data() })
            })

        getDoc(lessonRef)
            .then(res => {
                setLesson({ id: res.id, ...res.data() })
            })
            .finally(() => setLoading(false))
    }, [curso, video])

    useEffect(() => {
        const db = getFirestore()
        if (course.title) {
            const videosRef = query(collection(db, 'videos'), where('curso', '==', course.key), orderBy('date', 'asc'))

            getDocs(videosRef)
                .then(res => {
                    setVideos(res.docs.map(video => ({ id: video.id, ...video.data() })))
                })
                .finally(() => setLoading(false))
        }
    }, [course])

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                {loading ? <div>Cargando...</div>
                    :
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 xl:grid xl:grid-cols-2 xl:grid-4 pt-4">

                            <div className='flex justify-center items-center w-full'>
                                <iframe
                                    width="788" height="332"
                                    src={lesson.video}
                                    title={lesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoPlay; clipboardWrite; encryptedMedia; gyroscope; pictureInPicture" allowFullScreen
                                    className='shadow-md rounded-xl w-full h-72 md:h-96'
                                />
                            </div>

                            <div className='xl:pl-3 xl:py-2 flex flex-col xl:gap-4 mt-4 xl:mt-0'>
                                <h1 className='text-xl md:text-2xl xl:text-3xl font-bold'>{lesson.title}</h1>
                                <p className='text-md md:text-xl mt-2'>{lesson.descripcion}</p>
                                {lesson.urlDocs.length && (
                                    <div className='flex flex-col gap-1 mt-3'>
                                        <h4 className='text-lg md:text-xl font-semibold'>Enlaces útiles</h4>
                                        {lesson.urlDocs.map((doc, i) => (
                                            <a href={doc} key={i} target='_blank' rel='noopener noreferrer' className='text-teal-500 hover:text-teal-600 flex gap-1 items-center'>
                                                <LinkIcon className='h-4' />
                                                {` ${doc.substring(doc.lastIndexOf('//') + 1).substring(0, 50)}...`}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>


                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                            {videos.length > 0 && (
                                <div className="max-w-2xl mx-auto py-4 sm:py-4 lg:max-w-none">
                                    <h3 className='text-2xl font-extrabold text-teal-500'>Videos del curso</h3>
                                    <div className="mt-3 md:mt-6 flex flex-col gap-2">
                                        {videos.map((video, i) => (
                                            <Link key={i} to={`/learn/${course.id}/${video.id}`}>
                                                <div key={i} className="flex bg-white py-3 md:py-4 px-3 rounded-md border-2 border-gray-300 hover:bg-gray-200">
                                                    <div className="flex-1">
                                                        <h3 className=" text-md md:text-lg leading-6 font-semibold text-gray-900">
                                                            {`${i + 1} - ${video.title}`}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}



                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Video