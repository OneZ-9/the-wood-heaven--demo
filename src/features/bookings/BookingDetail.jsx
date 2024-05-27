import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  // console.log(booking);
  const { status, id: bookingId } = booking;
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // function handleDeleteBooking() {
  //   deleteBooking(bookingId);
  //   navigate("/bookings");
  // }

  if (isLoading || isDeletingBooking) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          {status !== "checked-in" && (
            <Modal.Open opens="delete-booking">
              <Button variation="danger">Delete booking</Button>
            </Modal.Open>
          )}

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={
                () =>
                  deleteBooking(bookingId, { onSettled: () => navigate(-1) }) //  can pass 2nd part with an object which includes all the options we need to specify
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
