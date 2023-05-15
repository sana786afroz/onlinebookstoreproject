import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const[num,setNum]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if(data){
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  const bookp = 67999;
  
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  if(loading) return <Loading />;
  // function randomNumberInRange(min, max) {
  //   // 👇️ get number between min (inclusive) and max (inclusive)
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // const handleClick = () => {
   
  // };
function loadScript(src){
return new Promise((resolve)=>{
  const script=document.createElement('script')
  script.src=src
  script.onload=()=>{
    resolve(true)
  }

  script.onerror=()=>{
    resolve(false)
  }

  document.body.appendChild(script)
})
}
 async function dispalyRazorpay(amount){
   const res= await loadScript('https://checkout.razorpay.com/v1/checkout.js')

   if(!res){
    alert("failed to do payment")
    return
   }

   const options={
    key:"rzp_test_0DLhf25V6k35QB",
    currency:"INR",
    amount:amount * 100,
    name:"Sana Online BookStore",
    description:"thanks for purchasing ",
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoiDmZYSYTt9vS9TA3p4w_Y4fiIAm3KFoomA&usqp=CAU',
    

    handler:function (response){
      alert(response.razorpay_payment_id)
      alert("payment successfull")
    },
   prefill:{
    name:"Sana Online BookStore"
   }
   
  };

  const paymentObj=new window.Razorpay(options)
  paymentObj.open()
  }
  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            <div className='book-details-item'>
            <span className='fw-6'>Price: </span>
          
            <p>{formatter.format(bookp)}</p>
            <button onClick={()=>dispalyRazorpay(bookp)}>buy now</button>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails
