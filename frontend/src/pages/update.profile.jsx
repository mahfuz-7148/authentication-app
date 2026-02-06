import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/auth.slice.js';
import { useUpdateProfileMutation } from '../slices/users.api.slice.js';
import { FormContainer } from '../components/form.container.jsx';
import { Loader } from '../components/loader.jsx';
import ChangePasswordModal from '../components/change.password.modal.jsx';

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

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
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to update profile');
    }
  };

  return (
    <>
      <FormContainer>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Update Profile
        </h1>

        <form onSubmit={submitHandler}>
          {/* Name Field */}
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>
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
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
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
          <div className='mb-6 border-t pt-4'>
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

          {/* Update Profile Button */}
          <button
            disabled={isLoading}
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-3'
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>

          {/* Change Password Button */}
          <button
            type='button'
            onClick={() => setIsPasswordModalOpen(true)}
            className='w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors'
          >
            Change Password
          </button>

          {isLoading && (
            <div className='mt-4 flex justify-center'>
              <Loader />
            </div>
          )}
        </form>
      </FormContainer>

      {/* Password Change Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default UpdateProfile;