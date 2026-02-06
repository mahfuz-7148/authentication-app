import { useState } from 'react';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../slices/users.api.slice.js';
import { Loader } from './loader.jsx';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      toast.success('Password changed successfully');

      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Close modal
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to change password');
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-40'
        onClick={handleClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
          {/* Header */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Change Password
            </h2>
            <button
              onClick={handleClose}
              className='text-gray-500 hover:text-gray-700 text-2xl'
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className='mb-4'>
              <label
                htmlFor='currentPassword'
                className='block text-gray-700 font-semibold mb-2'
              >
                Current Password
              </label>
              <input
                type='password'
                id='currentPassword'
                placeholder='Enter current password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            {/* New Password */}
            <div className='mb-4'>
              <label
                htmlFor='newPassword'
                className='block text-gray-700 font-semibold mb-2'
              >
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                placeholder='Enter new password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            {/* Confirm New Password */}
            <div className='mb-6'>
              <label
                htmlFor='confirmPassword'
                className='block text-gray-700 font-semibold mb-2'
              >
                Confirm New Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            {/* Buttons */}
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={handleClose}
                className='flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>

            {isLoading && (
              <div className='mt-4 flex justify-center'>
                <Loader />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;