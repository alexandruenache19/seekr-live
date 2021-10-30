function Example() {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <>
      <Flex mb={2}>
        <Input value={value} isReadOnly placeholder="Welcome" />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </>
  );
}
