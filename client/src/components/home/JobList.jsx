import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, JobCategories, JobLocations} from '../../assets/assets';
import JobCard from './jobCard';

const JobList = () => {

    const {isSearched, searchFilter, setSearchFilter, jobs} = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedLocation, setSelectedLocation] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    // Inside the component
    const jobListRef = useRef(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setTimeout(() => {
            jobListRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to ensure state update
    };


    const handleLocationChange = (location)=>{
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter((c) => c !== location) : [...prev,location]
        )
        setTimeout(() => {
            jobListRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    useEffect(()=>{

        const matchesCategory = (job) => selectedCategory === "" || selectedCategory === job.category;

        const matchesLocation = (job) => selectedLocation.length === 0 || selectedLocation.includes(job.location)

        const matchesTitle = (job) => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = (job) => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            (job) => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    },[jobs, selectedCategory, selectedLocation, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            
            {/* Sidebar */}
            <div className='w-full lg:w-1/5 bg-white px-4 
                lg:sticky lg:top-4 lg:self-start 
                lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto custom-scrollbar'>
                
                {/* Search Filter from Hero Component */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "")
                    ? (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.title &&(
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-2 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={ (e)=>setSearchFilter(prev => ({...prev,title:""})) } className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location &&(
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-2 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img onClick={ (e)=>setSearchFilter(prev => ({...prev,location:""})) } className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                
                            </div>
                        </>
                    ): ("")
                }

                <button onClick={ (e) => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden cursor-pointer'>
                    {showFilter ? "Close" : "Filters"}
                </button>

                {/* Category Filter */}
                <div className={showFilter? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        <li className='flex gap-3 items-center'>
                            <input 
                                className='scale-100 cursor-pointer' 
                                type="radio" 
                                name="job-category"
                                onChange={()=> handleCategoryChange("")}
                                checked={selectedCategory === "" }
                            />
                            All Jobs
                        </li>
                        {
                            JobCategories.map((category,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input 
                                        className='scale-100 cursor-pointer' 
                                        type="radio" 
                                        name="job-category"
                                        value={category}
                                        onChange={()=> handleCategoryChange(category)}
                                        checked={selectedCategory.includes(category)}
                                    />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {
                                JobLocations.map((location,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125 cursor-pointer' 
                                        type="checkbox" 
                                        onChange={()=> handleLocationChange(location)}
                                        checked={selectedLocation.includes(location)}
                                    />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
            </div>
            
            {/* Job listings */}
            <section ref={jobListRef} className='w-full lg:w-4/5 text-gray-800 px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Most Recent jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                {
                    filteredJobs.length > 0 ?(
                        <h4 className='font-medium text-2xl pb-8 text-center' id='job-list'> {filteredJobs.length} Jobs Found</h4>
                    )
                    :
                    (
                        <h4 className='font-extra-medium text-2xl pb-8 text-blue-400 pt-10' id='job-list'>🔍 No jobs match your filters. Try adjusting your search criteria! 🥲</h4>
                    )
                }
                
                <div className='grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4'>
                    {
                            filteredJobs.slice((currentPage-1)*10, currentPage*10).map((job,index)=>(
                            <JobCard key={index} job={job} index={index}/>
                        ))
                    }
                </div>


                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={()=>setCurrentPage(Math.max(currentPage-1,1))} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from( {length:Math.ceil(filteredJobs.length/10)}).map((_,index)=> (
                            <a key={index} href="#job-list">
                                <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition duration-400  border border-gray-300 rounded ${currentPage === index+1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500' }`}>{index+1}</button>
                            </a>
                        )) }
                        <a href="#job-list">
                            <img onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length / 10)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}

            </section>
             
        </div>
    );
};

export default JobList;