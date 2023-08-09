
function showToast(toast, title, status, description) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  }

  export default showToast;
  