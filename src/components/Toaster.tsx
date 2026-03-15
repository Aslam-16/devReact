import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleToast } from '../slices/toastSlice'

const Toaster = () => {
    const dispatch=useDispatch()
    const toast=useSelector((store)=>store.toast)

    useEffect(() => {
        setTimeout(() => {
            if (toast.error) {
                dispatch(toggleToast({ message: '', error: false, status: null }));
            }
        }, 5000);
    }, [toast.error]);
  return (
      <div className="toast fixed top-4 right-4 z-10">
          <div className="alert alert-error">
              <span>{toast.message}</span>
          </div>
      </div>
  )
}

export default Toaster