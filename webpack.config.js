const path= require('path')
const webpack= require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')



module.exports={
	entry:{
		main: ['@babel/polyfill','./app/index.js']
	},
	output:{
		filename: '[name].[hash].js',
		path: path.join(__dirname,'dist')
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	module:{
		rules:[
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				oneOf: [
				  {
				    resourceQuery: /^\?vue/,
				    use: [
				        MiniCssExtractPlugin.loader,
				        'css-loader',
				        {
				          loader: 'sass-loader',
				          options: {
				            sassOptions: {
				              indentedSyntax: true
				            }
				          }
				        }
				      ]
				  },
				  {
				    use: [
				    	MiniCssExtractPlugin.loader, 
				    	{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
								autoprefixer()
								],
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: true }
						}
					]
				  }
				]
				
			},
			{
				test: /\.css/,
				    use: [
				    	MiniCssExtractPlugin.loader, 
				    	{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
								autoprefixer()
								],
								sourceMap: true
							}
						}
					]
				
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader',
				// options: {
				//     loaders: {
				//       // css: ExtractTextPlugin.extract({
				//       //               use: 'css-loader',
				//       //               fallback: 'vue-style-loader' 
				//       //             }),
				//       scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
				//       sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
				//     }
				//   }
				
			},
			{
				test: /\.(jpe?g|png|svg)$/i,
				use:[ 
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: path.resolve(__dirname,'dist/imgs/'),
								// useRelativePath: true
							}
						}
					]
			},
			{
				test: /\.(woff|svg|ttf|eot|woff2)$/,
				use: [
				'file-loader',
				]         
			},
			{
			  test: /\.pug$/,
			  oneOf: [
			    {
			      resourceQuery: /^\?vue/,
			      use: ['pug-plain-loader']
			    },
			    {
			      use: ['raw-loader', 'pug-plain-loader']
			    }
			  ]
			}
		]
	},
	plugins:
		[
			new CleanWebpackPlugin(),
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
			}),

			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
			new ExtractTextPlugin({
				filename: 'vue.style.css',
				allChunks: true
			}),
			new HtmlWebpackPlugin({ 
			      template: './app/index.pug',
			      name: '[name].[hash].html'
			    }),
			new HtmlWebpackPugPlugin(),


		]
}