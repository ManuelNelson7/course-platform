import React, { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { ClockIcon } from '@heroicons/react/outline'

const CourseGrid = () => {

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const db = getFirestore()
        const courses = collection(db, 'cursos')

        getDocs(courses)
            .then(res => {
                setCourses(res.docs.map(course => ({ id: course.id, ...course.data() })))
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-8 sm:py-4 lg:max-w-none">
                    <h2 className="text-2xl font-extrabold text-gray-900">Cursos disponibles</h2>

                    {loading ? <div>Cargando...</div> :
                        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                            {courses.map((course) => (
                                <div key={course.id} className="group relative">
                                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img
                                            src={course.portada}
                                            alt={course.title}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-2 mb-1 text-lg text-gray-600 font-semibold">
                                        <Link to={`/curso/${course.id}`}>
                                            <span className="absolute inset-0" />
                                            {course.title}
                                        </Link>
                                    </h3>
                                    {course.tags.map((tag) => (
                                        <span key={tag} className="inline-block bg-teal-600 bg-opacity-75 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 capitalize">{tag}</span>
                                    ))}
                                </div>
                            ))}

                            <div className="group relative">
                                <div className="relative w-full h-80 bg-white border-4 border-gray-300 border-dashed rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 flex justify-center items-center">
                                    <ClockIcon className='h-20 text-gray-500' />
                                </div>
                                <h3 className="mt-2 text-lg text-gray-600 font-semibold">
                                    <span className="absolute inset-0" />
                                    Proximamente
                                </h3>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default CourseGrid