import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/auth.slice.js';
import { useUpdateProfileMutation } from '../slices/users.api.slice.js';
import { Loader } from './loader.jsx';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo && isOpen) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setCurrentPassword('');
    }
  }, [userInfo, isOpen]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error('Please enter your current password to update profile');
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        currentPassword,
      }).unwrap();

      dispatch(setCredentials(res));
      setCurrentPassword('');
      toast.success('Profile updated successfully');
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to update profile');
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        {/* Modal Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-800'>Edit Profile</h2>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={submitHandler}>
          <div className='p-6 space-y-4'>
            {/* Name Field */}
            <div>
              <label
                htmlFor='name'
                className='block text-gray-700 font-semibold mb-2'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-gray-700 font-semibold mb-2'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            {/* Current Password Field */}
            <div className='border-t pt-4'>
              <label
                htmlFor='currentPassword'
                className='block text-gray-700 font-semibold mb-2'
              >
                Current Password <span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                id='currentPassword'
                placeholder='Enter current password to confirm changes'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
              <p className='text-sm text-gray-500 mt-1'>
                Required to verify your identity
              </p>
            </div>

            {isLoading && (
              <div className='flex justify-center py-2'>
                <Loader />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={handleClose}
              className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors'
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type='submit'
              className='px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;