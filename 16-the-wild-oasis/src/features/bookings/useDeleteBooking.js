import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi} from '../../services/apiBookings'
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryCLient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: id => deleteBookingApi(id),

    onSuccess: () => {
      toast.success('Booking successfully deleted');

      queryCLient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
