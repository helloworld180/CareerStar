<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		display: flex;
		flex-direction: column;
		/* 父盒子占满整个页面 */
	    height: 100%;
		background-color: #fefbff;
	}
</style>
