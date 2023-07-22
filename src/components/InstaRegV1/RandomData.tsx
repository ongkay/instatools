import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button } from '@mantine/core'

export function RandomData() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        position="bottom"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button onClick={open}>Open drawer</Button>
    </>
  )
}
