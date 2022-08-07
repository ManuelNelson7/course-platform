import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, getFirestore, getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import Auth from '../components/Auth'

const CoursePreview = () => {
    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const [error, setError] = useState('')
    const [allowAccess, setAllowAccess] = useState(false)

    useEffect(() => {
        if (course.privado === true) {
            password !== '' && password !== course.pass && setError('Contraseña incorrecta')
            if (password === course.pass) {
                setAllowAccess(true)
                localStorage.setItem('password', password)
            }
        }
        if (course.privado === false) {
            setAllowAccess(true)
        }
    }, [password, course])

    useEffect(() => {
        const db = getFirestore()
        const courseRef = doc(db, 'cursos', id)

        getDoc(courseRef)
            .then(res => {
                setCourse({ id: res.id, ...res.data() })
            })
        window.scrollTo(0, 0);
    }, [id])

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
                        {allowAccess === true ?
                            <div>
                                <div className='w-screen'>
                                    <div className='w-screen h-72 md:h-96 relative bg-black'>
                                        <div className='h-72 md:h-96 w-full absolute top-0 left-0 flex justify-center items-center'>
                                            <h2 className="text-2xl px-4 md:text-4xl z-10 lg:text-5xl absolute font-extrabold text-white">
                                                {course.title}
                                            </h2>
                                        </div>
                                        <img src={course.portada} className='object-cover w-full h-full brightness-50' alt="" />
                                    </div>
                                </div>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-2xl mx-auto py-4 sm:py-4 lg:max-w-none">
                                        <h3 className='text-2xl font-extrabold text-teal-500'>Videos del curso</h3>
                                        <div className="mt-3 md:mt-6 flex flex-col gap-2">
                                            {videos.map((video, i) => (
                                                <Link key={i} to={`/learn/${course.id}/${video.id}`}>
                                                    <div className="flex bg-white py-3 md:py-4 px-3 rounded-md border-2 border-gray-300 hover:bg-gray-200">
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
                                </div>
                            </div>
                            :
                            <Auth setPassword={setPassword} error={error} />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default CoursePreview