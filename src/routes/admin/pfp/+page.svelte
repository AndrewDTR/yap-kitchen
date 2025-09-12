<script>
	async function callBackend() {
		try {
			const response = await fetch('/api/pfp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
		} catch (error) {
			alert(error.message || 'An unknown error occurred');
		}
	}
</script>

<button onclick={callBackend}>Run Script</button>
