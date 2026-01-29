import { CredentialForm } from '../../components/CredentialForm';
import { useRouter } from 'expo-router';

export default function AddScreen() {
  const router = useRouter();

  return (
    <CredentialForm
      onSuccess={() => {
        router.push('/tabs');
      }}
    />
  );
}
