<script>
    import Footer from '$lib/Footer.svelte';
    import Navbar from '$lib/Navbar.svelte';

    let { data } = $props();
</script>

<style>
    .page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .main-content {
        flex: 1;
    }
</style>

<div class="page-wrapper">
    <Navbar />
    <div class="main-content">
        <slot></slot>
    </div>
    <Footer commitHash={data.commitHash} environment={data.environment} />
</div>