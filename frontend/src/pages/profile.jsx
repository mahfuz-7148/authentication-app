import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormContainer } from '../components/form.container.jsx';
import ChangePasswordModal from '../components/change.password.modal.jsx';
import EditProfileModal from '../components/edit.profile.modal.jsx';

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <FormContainer>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          My Profile
        </h1>

        {/* Profile Display */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          {/* Name Display */}
          <div className='mb-6'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>
              Name
            </label>
            <p className='text-gray-800 text-lg font-medium'>
              {userInfo?.name || 'N/A'}
            </p>
          </div>

          {/* Email Display */}
          <div className='mb-6'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>
              Email Address
            </label>
            <p className='text-gray-800 text-lg font-medium'>
              {userInfo?.email || 'N/A'}
            </p>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 my-6'></div>

          {/* Action Buttons */}
          <div className='space-y-3'>
            {/* Edit Profile Button */}
            <button
              type='button'
              onClick={() => setIsEditProfileModalOpen(true)}
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
              </svg>
              Edit Profile
            </button>

            {/* Change Password Button */}
            <button
              type='button'
              onClick={() => setIsPasswordModalOpen(true)}
              className='w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
              Change Password
            </button>
          </div>
        </div>
      </FormContainer>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />

      {/* Password Change Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default Profile;